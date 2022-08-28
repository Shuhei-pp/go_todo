package service

import(
	"todo/data"
	"database/sql"
	_"github.com/go-sql-driver/mysql"
	"strconv"
	"fmt"
)

func SelectUser() []data.User{
	db, err := sql.Open("mysql", "test_user:password@(db:3306)/test_database")
	if err != nil{
			panic("データベース開けず!（dbDelete)")
	}
	defer db.Close() //関数の最後に発動?らしいよ

	rows, err := db.Query("SELECT * FROM user")
	if err != nil{
			panic("sqlミスってる!!!")
	}

	var users []data.User

	for rows.Next(){
			var user data.User
			err = rows.Scan(&user.Id,&user.Name,&user.Age)
			users = append(users,user)
	}

	return users
}

func  RegistUser(input data.JsonUserRequest) {
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
}