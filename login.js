let url_users = "https://danikho2020.github.io/json/user.json";

function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  fetch(url_users)
    .then(respuesta => respuesta.json())
    .then(users => {
      if (username != "" && password != "") {
        let pwdmatch;
        for (let user of users) {
          if (user.user == username) {
            pwdmatch = user.password;
          }
        }
        if (pwdmatch != "") {
          if (password == pwdmatch) {
            window.localStorage.setItem('session_init', username);
            window.location.href = "home.html";
          } else {
            document.getElementById("alert-container").innerHTML =
              `<div class="alert alert-danger d-flex align-items-center" role="alert">
                  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                  <div>
                    Hay errores en las credenciales
                  </div>
                </div>`;
            setTimeout(function () {
              document.getElementById("alert-container").innerHTML = ``;
            }, 3000);
          }
        } else {
          document.getElementById("alert-container").innerHTML =
            `<div class="alert alert-danger d-flex align-items-center" role="alert">
              <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              <div>
                Usuario no encontrado
              </div>
            </div>`;
          setTimeout(function () {
            document.getElementById("alert-container").innerHTML = ``;
          }, 3000);
        }
      }else{
        document.getElementById("alert-container").innerHTML =
            `<div class="alert alert-danger d-flex align-items-center" role="alert">
              <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              <div>
                Todos los campos deben estar completos
              </div>
            </div>`;
          setTimeout(function () {
            document.getElementById("alert-container").innerHTML = ``;
          }, 3000);
      }
    })
    .catch(error => alert(error))
}