package main

import (
    "github.com/gin-gonic/gin"
    _"fmt"
    "database/sql"
    _"github.com/go-sql-driver/mysql"
)

type User struct{
    Id int64
    Name string
    Age int64
}

func main() {
    router := gin.Default()
    router.LoadHTMLGlob("templates/*")
    router.Static("/assets","assets")

    db, err := sql.Open("mysql", "test_user:password@(db:3306)/test_database")
    if err != nil{
        panic("データベース開けず!（dbDelete)")
    }
    defer db.Close() //関数の最後に発動?らしいよ

    rows, err := db.Query("SELECT * FROM user")
    if err != nil{
        panic("sqlミスってる!!!")
    }

    var users []User

    for rows.Next(){
        var user User
        err = rows.Scan(&user.Id,&user.Name,&user.Age)
        users = append(users,user)
    }

    router.GET("/",func(c *gin.Context){
        c.HTML(200, "index.html", gin.H{
            "users":users,
        })
    })
    router.Run(":8080")
}

