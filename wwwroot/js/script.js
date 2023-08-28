//MODIFICAR ROL
  
  $(document).ready(function() {
    $('#modificarUsuarioBtn').click(function() {
        const idrol = $('#idrol').val();
        const newName = $('#newName').val();
        
        modificarUsuario(idrol, newName);
    });
});

//BUSCAR ROL

$(document).ready(function () {
  $('#buscarForm').submit(function (event) {
      event.preventDefault();

      var nombre = $('#buscarrol').val(); 

      $.ajax({
          url: '/welcome/buscarrol/' + nombre,
          type: 'GET',
          success: function (data) {
              $('#rolesContainer').html(data);
          },
          error: function (error) {
              console.log(error);
          }
      });
  });
});

//CREAR ROL

$(document).ready(function() {
  $('#crearRolBtn').click(function() {
      const rolNombre = $('#rolName').val();
      
      CrearRol(rolNombre);
  });
});

// CREACION GRILLA

$(document).ready(function () {
  var rolesContainer = $("#rolesContainer");

  var table = $("<table>");
  var headerRow = $("<tr>");
  headerRow.append($("<th>").text("Código de Rol"));
  headerRow.append($("<th>").text("Nombre de Rol"));
  table.append(headerRow);

  roles.forEach(function (rol) {
    var rolRow = $("<tr>");
    rolRow.append($("<td>").text(rol.rol_codRol));
    rolRow.append($("<td>").text(rol.rol_Nombre));
    table.append(rolRow);
});

  rolesContainer.append(table);
});