package main

import (
    "github.com/gin-gonic/gin"
    _"fmt"
)

func main() {
    router := gin.Default()
    router.LoadHTMLGlob("templates/*")
    router.Static("/assets","assets")

    router.GET("/",func(c *gin.Context){
        c.HTML(200, "index.html", gin.H{
            "message": "Hello World",
        })
    })
    router.Run(":8080")
}

// func main() {
// 	r := gin.Default()
// 	r.LoadHTMLGlob("templates/*") //ここでhtmlファイルのパス指定
// 	r.Static("/assets", "assets") //ここがcss、js、image等のパスを指定

// 	r.GET("/", func(c *gin.Context) {
// 		c.HTML(200, "index.html", gin.H{
// 			"message": "Hello World",
// 		})
// 	})
// 	r.Run()
// }