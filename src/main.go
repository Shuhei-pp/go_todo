package main

import (
    "todo/db"
    "todo/data"
    "github.com/gin-gonic/gin"
    "fmt"
	"database/sql"
	_"github.com/go-sql-driver/mysql"
    "net/http"
    "strconv"
)

func main() {
    router := gin.Default()
    router.POST("/api/registUser",func(c *gin.Context){

        // バリデーション？
        var input data.JsonUserRequest
        if err := c.ShouldBindJSON(&input); err != nil{
            c.JSON(http.StatusBadRequest,gin.H{"error": input})
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
    })

    router.LoadHTMLGlob("templates/*")
    router.Static("/assets","assets")

    var users []data.User = db.SelectUser()
    array := [...]int{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30}



    router.GET("/",func(c *gin.Context){
        c.HTML(200, "index.html", gin.H{
            "users":users,
            "array":array,
        })
    })
    router.Run(":8080")
}
