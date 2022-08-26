package main

import (
    "todo/db"
    "todo/data"
    "github.com/gin-gonic/gin"
    "fmt"
)

func main() {
    router := gin.Default()
    router.LoadHTMLGlob("templates/*")
    router.Static("/assets","assets")

    var users []data.User = db.SelectUser()

    router.GET("/",func(c *gin.Context){
        c.HTML(200, "index.html", gin.H{
            "users":users,
        })
    })
    router.Run(":8080")
}
