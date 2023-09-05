//Parametros de la grilla

document.addEventListener("DOMContentLoaded", function () {
  //Parámetros iniciales de grilla
  var rolesContainer = document.getElementById("rolesContainer");
  var rolesPerPage = 10;
  var currentPage = 1;
  var filteredRoles = null;

  //renderización de grilla
  var table = document.createElement("table");
  var headerRow = document.createElement("tr");
  var header1 = document.createElement("th");
  header1.textContent = "Código de Rol";
  var header2 = document.createElement("th");
  header2.textContent = "Nombre de Rol";
  var header3 = document.createElement("th");
  header3.textContent = "Modificar o Borrar";
  headerRow.appendChild(header1);
  headerRow.appendChild(header2);
  headerRow.appendChild(header3);
  table.appendChild(headerRow);

  //Paginacion
  function updatePagination() {
    var totalRoles = roles.length;
    var totalPages = Math.ceil(totalRoles / rolesPerPage);

    var pagination = rolesContainer.querySelector(".pagination");
    if (!pagination) {
      pagination = document.createElement("div");
      pagination.classList.add("pagination");
      rolesContainer.appendChild(pagination);
    } else {
      pagination.innerHTML = "";
    }

    // Botón "Anterior"
    var prevButton = document.createElement("span");
    prevButton.classList.add("arrow-button", "prev", "pointer");
    prevButton.textContent = "◀";
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        var startIndex = (currentPage - 1) * rolesPerPage;
        var endIndex = startIndex + rolesPerPage;
        displayRoles(startIndex, endIndex);
        updatePagination();
      }
    });
    pagination.appendChild(prevButton);

    // Números de página
    for (var i = 1; i <= totalPages; i++) {
      var pageButton = document.createElement("span");
      pageButton.classList.add("page-number", "pointer");
      pageButton.textContent = i;
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", function () {
        currentPage = parseInt(this.textContent);
        var startIndex = (currentPage - 1) * rolesPerPage;
        var endIndex = startIndex + rolesPerPage;
        displayRoles(startIndex, endIndex);
        updatePagination();
      });
      pagination.appendChild(pageButton);
    }

    // Botón "Siguiente"
    var nextButton = document.createElement("span");
    nextButton.classList.add("arrow-button", "next", "pointer");
    nextButton.textContent = "▶";
    nextButton.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        var startIndex = (currentPage - 1) * rolesPerPage;
        var endIndex = startIndex + rolesPerPage;
        displayRoles(startIndex, endIndex);
        updatePagination();
      }
    });
    pagination.appendChild(nextButton);
  }

  updatePagination();
  displayRoles(0, rolesPerPage);
  // Armado de filas y columnas según el back
  roles.forEach(function (rol) {
    var rolRow = document.createElement("tr");
    rolRow.classList.add("role-row");

    var rolCodCell = document.createElement("td");
    rolCodCell.textContent = rol.rol_codRol;
    rolRow.appendChild(rolCodCell);

    var rolNombreCell = document.createElement("td");
    rolNombreCell.textContent = rol.rol_Nombre;
    rolRow.appendChild(rolNombreCell);

    var buttonsContainer = document.createElement("td");

    // Botón "Modificar"
    var modifyButton = document.createElement("button");
    modifyButton.textContent = "Modificar";
    modifyButton.addEventListener("click", function () {
      var newIdRol = rol.rol_codRol;
      var currentURL = window.location.href;
      var newURL =
        currentURL.replace(/\/[^/]*$/, "/rol/createrol") +
        "?idrol=" +
        encodeURIComponent(newIdRol);

      window.location.href = newURL;
    });

    // Botón "Eliminar"
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
      var popup = document.createElement("div");
      popup.className = "confirmation-popup";

      // Contenido del popup del botón "eliminar"
      var message = document.createElement("p");
      message.textContent = "¿Está seguro que desea eliminar este elemento?";
      popup.appendChild(message);

      var deleteConfirmButton = document.createElement("button");
      deleteConfirmButton.textContent = "Eliminar";
      deleteConfirmButton.className = "delete-popup";
      deleteConfirmButton.addEventListener("click", function () {
        // poner lógica para eliminar el rol

        document.body.removeChild(popup);
      });
      popup.appendChild(deleteConfirmButton);
      // Botón "atrás"
      var cancelButton = document.createElement("button");
      cancelButton.textContent = "Volver Atrás";
      cancelButton.addEventListener("click", function () {
        document.body.removeChild(popup);
      });
      popup.appendChild(cancelButton);
      document.body.appendChild(popup);
    });

    // Renderización de "modificar" y "eliminar"
    buttonsContainer.appendChild(modifyButton);
    buttonsContainer.appendChild(deleteButton);

    // Aplicación de los botones en la fila
    rolRow.appendChild(buttonsContainer);

    // Agrega la fila anterior a la columna de la grilla
    table.appendChild(rolRow);
  });

  rolesContainer.appendChild(table);

  //armado del buscador y renderizacion boton "crear"
  var createButton = document.createElement("button");
  createButton.textContent = "Crear";
  createButton.className = "create-button";
  var searchInput = document.createElement("input");
  searchInput.setAttribute("type", "text");
  searchInput.setAttribute("placeholder", "Buscar por nombre");
  var searchButton = document.createElement("button");
  searchButton.textContent = "Buscar";
  var searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchButton);
  searchContainer.appendChild(createButton);

  rolesContainer.parentNode.insertBefore(searchContainer, rolesContainer);

  //Logica input de busqueda
  searchButton.addEventListener("click", function () {
    var searchTerm = searchInput.value.toLowerCase();
    filteredRoles = roles.filter(function (rol) {
      return rol.rol_Nombre.toLowerCase().includes(searchTerm);
    });

    updatePagination(filteredRoles);
    displayRolesSearch(0, rolesPerPage);
  });

  searchInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 /*enter*/) {
      searchButton.click();
    }
  });
  //Display de grilla
  function displayRoles(startIndex, endIndex) {
    var roleRows = table.querySelectorAll("tr.role-row");
    roleRows.forEach(function (roleRow, index) {
      if (index >= startIndex && index < endIndex) {
        roleRow.style.display = "table-row";
      } else {
        roleRow.style.display = "none";
      }
    });
  }
  //Logica Botón "Crear"
  createButton.addEventListener("click", function () {
    var newIdRol = 0;
    var currentURL = window.location.href;
    var newURL =
      currentURL.replace(/\/[^/]*$/, "/rol/createrol") +
      "?idrol=" +
      encodeURIComponent(newIdRol);

    window.location.href = newURL;
  });
  //Botones de filas
  var rowsPerPageButtons = [5, 10, 20];
  var rowsPerPageContainer = document.createElement("div");
  rowsPerPageContainer.classList.add("rows-per-page-container");

  rowsPerPageButtons.forEach(function (rows) {
    var button = document.createElement("button");
    button.textContent = rows + " filas por página";
    button.addEventListener("click", function () {
      rolesPerPage = rows;
      currentPage = 1;
      updatePagination();
      displayRoles(0, rolesPerPage);
    });
    rowsPerPageContainer.appendChild(button);
  });

  rolesContainer.parentNode.insertBefore(rowsPerPageContainer, rolesContainer);
  //Display de grilla al buscar
  function displayRolesSearch() {
    var roleRows = table.querySelectorAll("tr.role-row");
    var rolesToDisplay = filteredRoles || roles;

    roleRows.forEach(function (roleRow) {
      var roleNameCell = roleRow.querySelector("td:nth-child(2)");
      var roleName = roleNameCell.textContent;

      var shouldDisplay = rolesToDisplay.some(function (rol) {
        return rol.rol_Nombre === roleName;
      });

      if (shouldDisplay) {
        roleRow.style.display = "table-row";
      } else {
        roleRow.style.display = "none";
      }
    });
  }
  updatePagination();
  displayRoles(0, rolesPerPage);
  // Lista desplegable de filas por página
  var rowsPerPageSelect = document.createElement("select");
  rowsPerPageSelect.id = "rowsPerPage";

  var rowsPerPageOptions = [5, 10, 20];

  rowsPerPageOptions.forEach(function (optionValue) {
    var option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue + " Filas ";
    if (optionValue === rolesPerPage) {
      option.selected = true;
    }
    rowsPerPageSelect.appendChild(option);
  });

  rowsPerPageSelect.addEventListener("change", function () {
    rolesPerPage = parseInt(rowsPerPageSelect.value);
    currentPage = 1;
    updatePagination();
    displayRoles(0, rolesPerPage);
  });

  var rowsPerPageContainer = document.querySelector(".rows-per-page-container");
  rowsPerPageContainer.innerHTML = "";
  rowsPerPageContainer.appendChild(rowsPerPageSelect);
});
