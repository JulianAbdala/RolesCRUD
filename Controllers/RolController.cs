﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using LoginAdmin.Models;
using DKbase.web;

namespace LoginAdmin.Controllers
{
    public class RolController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            return View();
        }

//Lista de ROLES y Renderizacion de página
        [HttpGet("/admin/rol")]
        public IActionResult Welcome()
        {
            try
            {
                ViewData["Mensaje"] = "Cree, elimine o modifique un rol";
                            
                var roles = DKbase.Util.RecuperarTodasRoles("");

                if (roles != null && roles.Any())
                {
                    return View("Roles", roles);
                }
                else
                {
                    ViewData["Error"] = "No se encontraron roles en la base de datos.";
                    return View("ErrorView"); 
                }
            }
            catch (Exception ex)
            {
                ViewData["Error"] = "Ocurrió un error al recuperar los roles: " + ex.Message;
                return View("ErrorView"); 
            }
        }

        
//LOGOUT
        [HttpPost("/admin/logout")]
        [ValidateAntiForgeryToken]
        public IActionResult Logout()
        {
            // Realizar el cierre de sesión
            HttpContext.SignOutAsync();
            return RedirectToAction("login", "admin");
        }

//CREAR ROL
        
        [HttpGet("/admin/rol/createrol")]
        public IActionResult CrearRolPage(){                
            return View("CrearRol"); 
        }
        


        public IActionResult ModificarUsuario(int idrol) {
            ViewBag.IdRol = idrol;
            return View();
        }


//Modificacion de ROLES
        [HttpPost("/admin/rol/modificarrol")]
        public ActionResult Modificarrol(int idrol, string newName, cRol cRol)
            {
                DKbase.Util.InsertarActualizarRol(idrol, newName);
                
                if (idrol == 0){
                    DKbase.Util.InsertarActualizarRol(0, newName);
                    var nuevorol = new cRol
                    {
                        rol_codRol = 0,
                        rol_Nombre = newName
                    };
                    
                    DKbase.Util.RecuperarTodasRoles(newName).Add(nuevorol);
                }
                else{
                    var oldName = cRol.rol_Nombre;

                    var modifrol = new cRol
                    {
                        rol_codRol = idrol,
                        rol_Nombre = newName
                    };
                    
                    DKbase.Util.RecuperarTodasRoles(oldName).Add(modifrol);
                }
                ViewData["Mensaje"] = "El rol se ha creado exitosamente.";
                return RedirectToAction("Welcome");
  
            }
        

//Buscador de ROLES      
        [HttpGet("admin/rol/buscarrol/{nombre}")]
            public IActionResult BuscarRol(string nombre)
            {
                 try
                    {
                        var rolesEncontrados = DKbase.Util.RecuperarTodasRoles(nombre);

                        if (rolesEncontrados != null && rolesEncontrados.Any())
                        {
                            return PartialView("_TablaRoles", rolesEncontrados);
                        }
                        else
                        {
                            ViewData["Mensaje"] = "No se encontraron roles con el nombre proporcionado.";
                            return PartialView("_Mensaje", ViewData["Mensaje"]);
                        }
                    }

                    catch (Exception ex)
                    {
                        ViewData["Error"] = "Ocurrió un error al buscar los roles: " + ex.Message;
                        return PartialView("_Error", ViewData["Error"]);
                    }

            }
        
    }
}
