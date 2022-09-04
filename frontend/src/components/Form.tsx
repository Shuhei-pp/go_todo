import axios from 'axios'

interface User {
  Id: number,
  Name: string,
  Age: number
}

interface FormProps{
  name: string,
  age: number,
  users: User[],
  handleChangeName: (event: any) => void,
  handleChangeAge: (event: any) => void,
  handleSetUser: (users: User[]) => void,
  resetName: () => void,
  resetAge: ()=> void
}

export const Form = (props:FormProps) => {
  const ageArray: Number[] = [...Array(30)].map((_, i) => i)

  const registUserByAxios = () =>{
    axios.post("http://localhost:8080/api/registUser",{
      name: props.name,
      age: Number(props.age)
    })
    .then(function (response) {
        props.resetName()
        props.resetAge()
        const newUsers: any = props.users
        newUsers.push(response.data)
        props.handleSetUser(newUsers)
    })
  }

  return (
    <div className="container">
      <form className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <div className="form-group">
            <label><span className="label label-danger">必須</span> お名前</label>
            <input type="text" className="form-control" placeholder="例:test" value={props.name} onChange={(e)=>props.handleChangeName(e)} required/>
          </div>
          
          <div className="form-group mt-2">
            <label> 年齢</label>
            <select className="form-control" onChange={(e)=>props.handleChangeAge(e)}>
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
    )
}