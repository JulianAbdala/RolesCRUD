//MODIFICAR ROL

document.addEventListener("DOMContentLoaded", function () {
  const modificarUsuarioBtn = document.getElementById("modificarUsuarioBtn");
  modificarUsuarioBtn.addEventListener("click", function () {
    const idrol = document.getElementById("idrol").value;
    const newName = document.getElementById("newName").value;

    modificarUsuario(idrol, newName);
  });
});

//BUSCAR ROL

document.addEventListener("DOMContentLoaded", function () {
  var buscarForm = document.getElementById("buscarForm");
  buscarForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var nombre = document.getElementById("buscarrol").value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/admin/rol/buscarrol/" + nombre, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          document.getElementById("rolesContainer").innerHTML =
            xhr.responseText;
        } else {
          console.log("Error:", xhr.status);
        }
      }
    };
    xhr.send();
  });
});

//CREAR ROL

document.addEventListener("DOMContentLoaded", function () {
  const crearRolBtn = document.getElementById("crearRolBtn");
  crearRolBtn.addEventListener("click", function () {
    const newName = document.getElementById("newName").value;

    modificarUsuario(newName);
  });
});

//Boton ATRÁS
document.getElementById("volverAtras").addEventListener("click", function () {
  window.location.href = "/admin/rol";
});
