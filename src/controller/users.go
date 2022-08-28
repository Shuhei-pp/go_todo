package controller

import(
	"github.com/gin-gonic/gin"
	"todo/data"
	"todo/db"
	"net/http"
	"strconv"
	"fmt"
	"database/sql"
)

func RegistUserByApi(c *gin.Context){

	// バリデーション？
	var input data.JsonUserRequest
	if err := c.ShouldBindJSON(&input); err != nil{
			c.JSON(http.StatusBadRequest,gin.H{"error": err.Error()})
			return
	}

	db, err := sql.Open("mysql", "test_user:password@(db:3306)/test_database")
	if err != nil{
					panic("データベース開けず!（dbDelete)")
	}
	defer db.Close() //関数の最後に発動?らしいよ

	sql := "INSERT INTO user (name,age) values ('"+input.Name+"',"+strconv.Itoa(input.Age)+")"        

	rows, err := db.Query(sql)
	if err != nil{
					panic("sqlミスってる!!!")
					fmt.Print(rows)
	}

	c.JSON(http.StatusOK,input)
}

func SelectUser(c *gin.Context){

	var users []data.User = db.SelectUser()
	array := [...]int{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30}
	c.HTML(200, "index.html", gin.H{
			"users":users,
			"array":array,
	})
}