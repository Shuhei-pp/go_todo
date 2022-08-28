package main

import (
    "todo/controller"
    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.Default()
    router.LoadHTMLGlob("templates/*")
    router.Static("/assets","assets")

    // ルーティング
    router.POST("/api/registUser",controller.RegistUserByApi)
    router.GET("/",controller.SelectUser)
    router.Run(":8080")
}
