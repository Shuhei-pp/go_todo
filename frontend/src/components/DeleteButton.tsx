import axios from 'axios'
interface User {
  Id: number,
  Name: string,
  Age: number
}

interface DeleteButtonProps {
  uid: number,
  handleSetUser: (users: User[]) => void,
  users: User[]
}

export const DeleteButton = (props: DeleteButtonProps) => {

  return (
    <td>
      <button className="btn btn-danger" onClick={()=>deleteUserByAjax(props)}>
        削除
      </button>
    </td>
  )
}

const deleteUserByAjax = (props: DeleteButtonProps) => {
  axios.post("http://localhost:8080/api/deleteUser", {
    id: props.uid
  })
  .then(function () {
    const newUsers = props.users.filter(user => user.Id != props.uid)
    props.handleSetUser(newUsers)
  })
}