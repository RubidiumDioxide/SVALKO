async function LogIn(e) {
  e.preventDefault(); 

  const username = document.getElementById("username_input").value;
  const password = document.getElementById("password_input").value; 

  if(username == null || username == undefined || username == ""|| password == null || password == undefined || password == "" ){
      console.error("Error: ",  "пустые поля ввода");
      alert("Заполните поля ввода"); 
      return; 
  }

  $.ajax({
      url: `./api/users/${username}`, 
      type: "GET",
  success: function (response) {
      console.log("Response:", response); 
      
      const user = response[0]; 

      console.log(password, user.Password); 

      if(password == user.Password){
        alert(`Давно не виделись, ${username}!`);
      }
      else{
        alert("Неверный пароль или логин. Перепроверьте введенные данные"); 
      }
      
  },
  error: function (xhr, status, error) {
      console.error("Error:", error);
      alert("Неверный пароль или логин. Перепроверьте введенные данные"); 
  }
  });
}

