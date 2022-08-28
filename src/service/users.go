package service

import(
	"todo/data"
	"database/sql"
	_"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"os"
)

func GetDbInfoByEnv() (string,string){
	err := godotenv.Load(".env")
	if err != nil{
		panic("env読み込めんよ!!")
	}
	var dbDriver string = os.Getenv("DB_DRIVER")
	var dbUser string = os.Getenv("MYSQL_USER")
	var dbPassword string = os.Getenv("MYSQL_PASSWORD")
	var dbHost string = os.Getenv("MYSQL_HOST")
	var dbPORT string = os.Getenv("MYSQL_PORT")
	var dbName string = os.Getenv("MYSQL_DATABASE")

	var str string = dbUser+":"+dbPassword+"@("+dbHost+":"+dbPORT+")/"+dbName

	return dbDriver, str
}

func SelectUser() []data.User{
	driver, connectInfo := GetDbInfoByEnv()
	db, err := sql.Open(driver, connectInfo)
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

func DeleteUser(id int){
	driver, connectInfo := GetDbInfoByEnv()
	db, err := sql.Open(driver, connectInfo)
	if err != nil{
		panic("データベース開けず!（dbDelete)")
	}
	defer db.Close()

	res,err := db.Exec("DELETE FROM user WHERE id = ?",id)
	_=res
	if err != nil{
		panic("sqlミスってる!!!")
	}
}

func  RegistUser(input data.JsonUserRequest) {
	driver, connectInfo := GetDbInfoByEnv()
	db, err := sql.Open(driver, connectInfo)
	if err != nil{
					panic("データベース開けず!（dbDelete)")
	}
	defer db.Close()         

	res, err := db.Exec("INSERT INTO user (name,age) values (?,?)", input.Name, input.Age)
	_=res
	if err != nil{
		panic("sqlミスってる!!!")
	}
}