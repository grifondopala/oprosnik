let old_password_div = document.createElement('div');
  old_password_div.className = "password";
  old_password_div.innerHTML = "<input id = \"old_password\"> Введите текст\n" +
      "            <button id = \"check_button\"> ага </button>";

  script.append(old_password_div);
let invalid_data = document.createElement('div');
  invalid_data.innerHTML = "INVALID DATA ";
  invalid_data.hidden = true;
  script.append(invalid_data);

let button1 = document.querySelector('#check_button');

let new_password_div = document.createElement('div');
 new_password_div.hidden = true;
 new_password_div.innerHTML = '<input id = "new_password_input" value =""> Введите новый пароль\n' +
     '        <br>\n' +
     '        <input id = "new_password_check" value = "">Подтвердите пароль\n' +
     '        <br> <button id = "check_button2">ага</button>';

 new_password_Div.append(new_password_div);
let check_button2 = document.querySelector('#check_button2');

function GetPassword(){
    let old_password = document.querySelector('#old_password').value;
    let text = {
        password : old_password,
        stage: true
    }
    let json = JSON.stringify(text);
     $.ajax({
      url: "",
      type: "POST",
      dataType: "json",
      data: json,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,  // don't forget to include the 'getCookie' function
      },
      success: (data) => {
        console.log(data);
          if ( data["check"] == true ) {
            old_password_div.remove();
            new_password_div.hidden = false;
            check_button2.addEventListener("click", GetNewPassword);
            }
        else {
            invalid_data.hidden = false;
            function  wait(){
                invalid_data.hidden = true;
                 }
            setTimeout(wait, 3000);
        }
      },

      error: (error) => {
        console.log(error);
      }
    });
}
function enter (e){
     if ( e.keyCode == 13) {
        GetPassword();
    }
}
function enter1 (e){
     if ( e.keyCode == 13) {
        GetNewPassword();
    }
}
function GetNewPassword() {
    let new_password_input = document.querySelector('#new_password_input').value;
    let new_password_check = document.querySelector('#new_password_check').value;
    if (new_password_check == new_password_input) {
        let text = {
            stage: false,
            password: new_password_check,
        }
        let json = JSON.stringify(text);
        $.ajax({
            url: "",
            type: "POST",
            dataType: "json",
            data: json,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRFToken": document.querySelector('input[name="csrfmiddlewaretoken"]').value,  // don't forget to include the 'getCookie' function
            },
            success: (data) => {
                console.log(data);
            },

            error: (error) => {
                console.log(error);
            }
        });
    }
}

button1.addEventListener("click", GetPassword);
// window.addEventListener("keypress", enter);