import axios from 'axios'
interface User {
  Id: number,
  Name: string,
  Age: number
}

export const DeleteButton = (props: { uid: number, handleDeleteUser: (users: User[]) => void,users:User[] }) => {

  return (
    <td>
      <button className="btn btn-danger" onClick={()=>deleteUserByAjax(props)}>
        削除
      </button>
    </td>
  )
}

const deleteUserByAjax = (props: { uid: number, handleDeleteUser: (users: User[]) => void,users:User[] }) => {
  axios.post("http://localhost:8080/api/deleteUser", {
    id: props.uid
  })
  .then(function () {
    const newUsers = props.users.filter(user => user.Id != props.uid)
    props.handleDeleteUser(newUsers)
  })
}