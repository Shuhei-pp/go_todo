import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { useState,useEffect } from 'react'

interface User {
  Id: number,
  Name: string,
  Age: number
}

export const Todo = () => {
  const [users, setUsers] = useState<User[]>()
  const [error, setError] = useState()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const Columns = [
    { Header: "userid", accessor: "id" },
    { Header: "名前", accessor: "name" },
    { Header: "年齢", accessor: "age" },
  ]

  useEffect(() => {//useEffectを使用することでreactレンダリング時に一度だけ読み込みます?
    axios.get("http://localhost:8080/api/getUser")
      .then(function (response: any) {
        setUsers(response.data)
      })
      .catch(function (error) {
        console.log(error)
        setError(error)
      })
  }, [])

  const handleChangeName = (event:any) => {
    setName(event.target.value)
  }

  const handleChangeAge = (event:any) => {
    setAge(event.target.value)
  }

  const ageArray:Number[] =[...Array(30)].map((_,i)=>i)

  const registUserByAxios = (event:any/*anyは避けたい。*/) =>{
    event.preventDefault()
    axios.post("http://localhost:8080/api/registUser",{
      name: name,
      age: Number(age)
    })
      .then(function (response) {
        setName('')
        setAge('')
        axios.get("http://localhost:8080/api/getUser")
        .then(function (response: any) {
          setUsers(response.data)
        })
        .catch(function (error) {
          console.log(error)
          setError(error)
        })
    })
  }
  
  if (users)
    return (
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {Columns.map((Column,index) => {
                return (
                  <th key={index}>{Column.Header}</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {users.map((user,index) => {
              return(
                <tr key={index}>
                  <td>{ user.Id}</td>
                  <td>{ user.Name}</td>
                  <td>{ user.Age}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>

        <div className="container">
          <form className="row">
            <div className="col-sm-8 col-sm-offset-2">
              <div className="form-group">
                <label><span className="label label-danger">必須</span> お名前</label>
                <input type="text" className="form-control" placeholder="例:test" value={name} onChange={(e)=>handleChangeName(e)} required/>
              </div>
              
              <div className="form-group mt-2">
                <label> 年齢</label>
                <select className="form-control" onChange={(e)=>handleChangeAge(e)}>
                  <option value="">選択してください</option>
                  {ageArray.map((_,i)=>{
                    return (
                      <option key={i} value={String(_)}>{String(_)}</option>
                    )
                  })}
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3" onClick={registUserByAxios}>登録する</button>
            </div>
          </form>
        </div>
      </div>
    )
  else if (error)
    return (
      <p>データの取得に失敗しました</p>
    )
  else
    return (
      <p>データ取得中....</p>
    )
  
}