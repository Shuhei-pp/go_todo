import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { DeleteButton } from './DeleteButton'
import { Form } from './Form'

interface User {
  Id: number,
  Name: string,
  Age: number
}

export const Todo = () => {
  const [users, setUsers] = useState<User[]>()
  const [error, setError] = useState()
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

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

  const handleChangeName = (event: any) => {
    setName(event.target.value)
  }

  const resetName = () => {
    setName('')
  }

  const handleChangeAge = (event:any) => {
    setAge(event.target.value)
  }

  const resetAge = () => {
    setAge(0)
  }

  const handleSetUser = (Users:User[]) => {
    setUsers(Users)
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
                  <td>{user.Age}</td>
                  <DeleteButton uid={user.Id} handleSetUser={e => handleSetUser(e)} users={users} />
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Form
          name={name}
          age={age}
          users={users}
          handleChangeName={e => handleChangeName(e)}
          handleChangeAge={e => handleChangeAge(e)}
          handleSetUser={e => handleSetUser(e)}
          resetName={() => resetName}
          resetAge={() => resetAge}
        />
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