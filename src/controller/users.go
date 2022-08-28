package controller

import(
	"github.com/gin-gonic/gin"
	"todo/data"
	"todo/service"
	"net/http"
)

func RegistUserByApi(c *gin.Context){

	// バリデーション？
	var input data.JsonUserRequest
	if err := c.ShouldBindJSON(&input); err != nil{
			c.JSON(http.StatusBadRequest,gin.H{"error": err.Error()})
			return
	}

	service.RegistUser(input)

	c.JSON(http.StatusOK,input)
}

func SelectUser(c *gin.Context){

	var users []data.User = service.SelectUser()
	array := [...]int{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30}
	c.HTML(200, "index.html", gin.H{
			"users":users,
			"array":array,
	})
}