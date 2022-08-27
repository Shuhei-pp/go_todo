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
  })
})