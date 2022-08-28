$registForm = $("#registUser")
$registForm.submit(function(event){
  var data ={
    name : $registForm.find("#name").val(),
    age : parseInt($registForm.find("#age").val())
  }
  event.preventDefault()
  $.ajax({
    url: "/api/registUser",
    type:"post",
    dataType:"json",
    data:JSON.stringify(data)
  })
  .done(function(response){
    location.reload()
  })
  .fail(function(){
    console.log("submit,fail.....")
  })
})

$deleteButton = $(".deleteButton")
$deleteButton.click(function(event){
  const c = confirm('本当に削除していいの!?')
  if(c){
    const data = { id : parseInt($deleteButton.val())}
    $.ajax({
      url: "/api/deleteUser",
      type:"post",
      dataType:"json",
      data:JSON.stringify(data)
    })
    .done(function(response){
      alert("削除完了!!")
      location.reload()
    })
    .fail(function(res){
      console.log(res)
    })
  }else{
    alert("おけ！！")
  }
})