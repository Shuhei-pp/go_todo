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