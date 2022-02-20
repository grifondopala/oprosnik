let button = document.querySelector('#login_button');

let invalid_data = document.createElement("div")
  invalid_data.innerHTML = "INVALID DATA ";
  invalid_data.hidden = true;
  script.append(invalid_data);


function LogIn() {
    let login = document.querySelector('#login_input').value;
    let password = document.querySelector('#password_input').value;
    let text = {
        login: login,
        password: password,
    }
    let json = JSON.stringify(text);
    $.ajax ({
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
          if (data["stage"] == true ) {

              window.location.href = '/main';
          }
          if (data["stage"] == false)
           {

               function wait(){
                    invalid_data.hidden = true;
               }
              invalid_data.hidden = false;
              setTimeout(wait, 3000);
          }


        },
        error: (error) => {
          console.log(error);
        }
    })
}

button.addEventListener("click", LogIn);