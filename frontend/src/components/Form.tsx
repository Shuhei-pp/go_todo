export const RegistForm = () => {
  const ageArray:Number[] =[...Array(30)].map((_,i)=>i)
  return (
    <div className="container">
      <form className="row" id="registUser" >
        <div className="col-sm-8 col-sm-offset-2">
          <div className="form-group">
            <label><span className="label label-danger">必須</span> お名前</label>
            <input type="text" name="name" className="form-control" placeholder="例:test" required/>
          </div>
          
          <div className="form-group">
            <label> 年齢</label>
            <select id="age" name="age" className="form-control">
              <option value="">選択してください</option>
              {ageArray.map(_=>{
                return (
                  <option value={String(_)}>{String(_)}</option>
                )
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">登録する</button>
        </div>
      </form>
    </div>
  )
}