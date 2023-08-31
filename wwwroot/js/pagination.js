document.addEventListener("DOMContentLoaded", function () {
    var rolesContainer = document.getElementById("rolesContainer");
    var rolesPerPage = 5;
    var currentPage = 1;
    var filteredRoles = null;
  
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
  
    roles.forEach(function (rol) {
      var rolRow = document.createElement("tr");
      rolRow.classList.add("role-row");
  
      var rolCodCell = document.createElement("td");
      rolCodCell.textContent = rol.rol_codRol;
      rolRow.appendChild(rolCodCell);
  
      var rolNombreCell = document.createElement("td");
      rolNombreCell.textContent = rol.rol_Nombre;
      rolRow.appendChild(rolNombreCell);
  
      var modifyButton = document.createElement("button");
      modifyButton.textContent = "Modificar";
      modifyButton.addEventListener("click", function () {
        document.getElementById("idrol").value = rol.rol_codRol;
      });
  
      var buttonCell = document.createElement("td");
      buttonCell.appendChild(modifyButton);
      rolRow.appendChild(buttonCell);
  
      table.appendChild(rolRow);
    });
  
    rolesContainer.appendChild(table);
  
    var searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Buscar por nombre");
    var searchButton = document.createElement("button");
    searchButton.textContent = "Buscar";
    var searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
  
    rolesContainer.parentNode.insertBefore(searchContainer, rolesContainer);
  
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
  });
  