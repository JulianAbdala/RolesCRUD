//MODIFICAR ROL

$(document).ready(function () {
  $("#modificarUsuarioBtn").click(function () {
    const idrol = $("#idrol").val();
    const newName = $("#newName").val();

    modificarUsuario(idrol, newName);
  });
});

//BUSCAR ROL

$(document).ready(function () {
  $("#buscarForm").submit(function (event) {
    event.preventDefault();

    var nombre = $("#buscarrol").val();

    $.ajax({
      url: "/admin/home/buscarrol/" + nombre,
      type: "GET",
      success: function (data) {
        $("#rolesContainer").html(data);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});

//CREAR ROL

$(document).ready(function () {
  $("#crearRolBtn").click(function () {
    const rolNombre = $("#rolName").val();

    CrearRol(rolNombre);
  });
});

//Grilla con paginacion

$(document).ready(function () {
  var rolesContainer = $("#rolesContainer");
  var rolesPerPage = 5;
  var currentPage = 1;

  var table = $("<table>");
  var headerRow = $("<tr>");
  headerRow.append($("<th>").text("Código de Rol"));
  headerRow.append($("<th>").text("Nombre de Rol"));
  headerRow.append($("<th>").text("Modificar o Borrar"));
  table.append(headerRow);

  roles.forEach(function (rol) {
    var rolRow = $("<tr>").addClass("role-row");
    rolRow.append($("<td>").text(rol.rol_codRol));
    rolRow.append($("<td>").text(rol.rol_Nombre));
    var modifyButton = $("<button>").text("Modificar");
    modifyButton.click(function () {
      $("#idrol").val(rol.rol_codRol);
    });

    var buttonCell = $("<td>").append(modifyButton);
    rolRow.append(buttonCell);
    table.append(rolRow);
  });

  rolesContainer.append(table);

  function displayRoles(startIndex, endIndex) {
    table.find("tr.role-row").hide();
    table.find("tr.role-row").slice(startIndex, endIndex).show();
  }

  function updatePagination() {
    var totalRoles = roles.length;
    var totalPages = Math.ceil(totalRoles / rolesPerPage);

    var pagination = rolesContainer.find(".pagination");
    if (!pagination.length) {
      pagination = $("<div>").addClass("pagination");
      rolesContainer.append(pagination);
    } else {
      pagination.empty();
    }

    var prevButton = $("<span>").addClass("arrow-button prev").text("◀");
    prevButton.click(function () {
      if (currentPage > 1) {
        currentPage--;
        var startIndex = (currentPage - 1) * rolesPerPage;
        var endIndex = startIndex + rolesPerPage;
        displayRoles(startIndex, endIndex);
        updatePagination();
      }
    });

    pagination.append(prevButton);

    for (var i = 1; i <= totalPages; i++) {
      var pageButton = $("<span>").addClass("page-number").text(i);
      if (i === currentPage) {
        pageButton.addClass("active");
      }
      pageButton.addClass("pointer");
      pageButton.click(function () {
        currentPage = parseInt($(this).text());
        var startIndex = (currentPage - 1) * rolesPerPage;
        var endIndex = startIndex + rolesPerPage;
        displayRoles(startIndex, endIndex);
        updatePagination();
      });
      pagination.append(pageButton);
    }

    var nextButton = $("<span>").addClass("arrow-button next").text("▶");
    nextButton.addClass("pointer");
    nextButton.click(function () {
      if (currentPage < totalPages) {
        currentPage++;
        var startIndex = (currentPage - 1) * rolesPerPage;
        var endIndex = startIndex + rolesPerPage;
        displayRoles(startIndex, endIndex);
        updatePagination();
      }
    });

    pagination.append(nextButton);
  }

  displayRoles(0, rolesPerPage);
  updatePagination();
});

//Boton ATRÁS
document.getElementById("volverAtras").addEventListener("click", function () {
  window.location.href = "welcome.cshtml";
});
