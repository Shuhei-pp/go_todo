package main

import (
    "todo/controller"
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func main() {
    router := gin.Default()
    router.LoadHTMLGlob("templates/*")
    router.Static("/assets","assets")

    //api投げたらcorsで引っかかったので
    router.Use(cors.New(cors.Config{
        AllowOrigins: []string{
            "http://localhost:3000",
        },
        AllowMethods: []string{
            "POST",
            "GET",
        },
        AllowHeaders: []string{
            "Content-Type",
        },
        AllowCredentials: false,
    },))

    // ルーティング
    router.GET("/api/getUser",controller.GetUserByApi)
    router.POST("/api/registUser",controller.RegistUserByApi)
    router.POST("/api/deleteUser",controller.DeleteUser)
    router.GET("/",controller.ShowTopPage)
    router.Run(":8080")
}
