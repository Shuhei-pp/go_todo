package data

type User struct{
	Id int64
	Name string
	Age int64
}

type JsonUserRequest struct{
	Name string `json:"name"`
	Age int `json:"age"`
}

type JsonDeleteUserId struct{
	Id int `json:"id"`
}