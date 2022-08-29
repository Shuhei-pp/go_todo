import Table from 'react-bootstrap/Table';

interface User {
  id: number,
  name: string,
  age: number
}

export const Todo = () => {
  const Columns = [
    { Header: "userid", accessor: "id" },
    { Header: "名前", accessor: "name" },
    { Header: "年齢", accessor: "age" },
  ]
  const users: User[] = [
    {id: 1,name: "kota",age:21},
    {id: 2,name: "baba",age:23},
    {id: 3,name: "mira",age:21},
  ]

  return (
    <Table striped bordered hover size="sm">
      <thead>
        {Columns.map((Column,index) => {
          return (
            <th>{Column.Header}</th>
          )
        })}
      </thead>
      <tbody>
        {users.map((user) => {
          return(
            <tr>
              <td>{ user.id}</td>
              <td>{ user.name}</td>
              <td>{ user.age}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}