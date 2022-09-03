package controller

import(
	"github.com/gin-gonic/gin"
	"todo/data"
	"todo/service"
	"net/http"
)

func GetUserByApi(c *gin.Context){
	var users []data.User = service.SelectUser()
	c.JSON(http.StatusOK,users)
}

func RegistUserByApi(c *gin.Context){

	// バリデーション？
	var input data.User
	if err := c.ShouldBindJSON(&input); err != nil{
		c.JSON(http.StatusBadRequest,gin.H{"error": err.Error()})
		return
	}

	id :=service.RegistUser(input)
	input.Id=id

	c.JSON(http.StatusOK,input)
}

func DeleteUser(c *gin.Context){
	var deleteUser data.JsonDeleteUserId
	err := c.ShouldBindJSON(&deleteUser)
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}
	service.DeleteUser(deleteUser.Id)

	c.JSON(http.StatusOK,deleteUser.Id)
}

func ShowTopPage(c *gin.Context){

	var users []data.User = service.SelectUser()
	var array [31]int = [...]int{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30}
	c.HTML(200, "index.html", gin.H{
			"users":users,
			"array":array,
	})
}
