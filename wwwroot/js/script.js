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

//Grilla con paginacion y filtro

$(document).ready(function () {
  var rolesContainer = $("#rolesContainer");
  var rolesPerPage = 5;
  var currentPage = 1;
  var filteredRoles = null; // Variable para almacenar los roles filtrados

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

  //Input y boton de busqueda
  var searchInput = $("<input>").attr("type", "text").attr("placeholder", "Buscar por nombre");
  var searchButton = $("<button>").text("Buscar");
  var searchContainer = $("<div>").addClass("search-container").append(searchInput, searchButton);

  rolesContainer.before(searchContainer);

  //funcion boton de busqueda
  searchButton.click(function () {
    var searchTerm = searchInput.val().toLowerCase();
    filteredRoles = roles.filter(function (rol) {
      return rol.rol_Nombre.toLowerCase().includes(searchTerm);
    });

    updatePagination(filteredRoles);
    displayRolesSearch(0, rolesPerPage);
  });

  searchInput.keyup(function(event) {
    if (event.keyCode === 13 /*enter*/) {
      searchButton.click();
    }
  });

  function displayRoles(startIndex, endIndex) {
    table.find("tr.role-row").hide();
    table.find("tr.role-row").slice(startIndex, endIndex).show();
  }
  //display de la busqueda
  function displayRolesSearch(startIndex, endIndex) {
    table.find("tr.role-row").hide();
    var rolesToDisplay = filteredRoles || roles;
    rolesToDisplay.slice(startIndex, endIndex).forEach(function (rol) {
      $("tr.role-row:contains('" + rol.rol_Nombre + "')").show();
    });
  }
  //actualiza la paginacion
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

    //botones de paginacion
    var prevButton = $("<span>").addClass("arrow-button prev").text("◀");
    prevButton.addClass("pointer");
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
  
  updatePagination();
  displayRoles(0, rolesPerPage);
});


//Boton ATRÁS
document.getElementById("volverAtras").addEventListener("click", function () {
  window.location.href = "welcome.cshtml";
});
