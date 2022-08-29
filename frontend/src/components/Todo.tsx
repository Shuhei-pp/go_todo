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

  const Columns = [
    { Header: "userid", accessor: "id" },
    { Header: "名前", accessor: "name" },
    { Header: "年齢", accessor: "age" },
  ]

  useEffect(() => {//useEffectを使用することでreactレンダリング時に一度だけ読み込みます?
    axios.get("http://localhost:8080/api/getUser")
    .then(function (response:any) {
      setUsers(response.data)
    })
    .catch(function (error) {
      console.log(error)
      setError(error)
    })
  },[])
  
  if (users)
    return (
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