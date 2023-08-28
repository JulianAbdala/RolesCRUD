using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using LoginAdmin.Models;
using DKbase.web;

namespace LoginAdmin.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            return View();
        }

//Lista de ROLES y Renderizacion de página
        [HttpGet("/welcome")]
        public IActionResult Welcome()
        {
            try
            {
                ViewData["Mensaje"] = "Cree, elimine o modifique un rol";
                            
                var roles = DKbase.Util.RecuperarTodasRoles("");

                if (roles != null && roles.Any())
                {
                    return View("Welcome", roles);
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
        [HttpPost("/logout")]
        [ValidateAntiForgeryToken]
        public IActionResult Logout()
        {
            // Realizar el cierre de sesión
            HttpContext.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }

//CREAR ROL
        
        [HttpGet("/createrol")]

        public IActionResult CrearRolPage(){                
            return View("CrearRol"); 
        }

        [HttpPost("/crearrol")]
        public IActionResult CrearRol(string rolName)
        {
                DKbase.Util.InsertarActualizarRol(0, rolName);
                var nuevorol = new cRol
                {
                    rol_codRol = 0,
                    rol_Nombre = rolName
                };
                DKbase.Util.RecuperarTodasRoles(rolName).Add(nuevorol);

                ViewData["Mensaje"] = "El rol se ha creado exitosamente.";
                return RedirectToAction("Welcome");
  

        }




//Modificacion de ROLES
        [HttpPost("/modificarrol")]
        public ActionResult Modificarrol(int idrol, string newName, cRol cRol)
            {
                DKbase.Util.InsertarActualizarRol(idrol, newName);
                
                var oldName = cRol.rol_Nombre;

                var modifrol = new cRol
                {
                    rol_codRol = idrol,
                    rol_Nombre = newName
                };

                DKbase.Util.RecuperarTodasRoles(oldName).Add(modifrol);

                ViewData["Mensaje"] = "El rol se ha creado exitosamente.";
                return RedirectToAction("Welcome");
  
            }
        

//Buscador de ROLES      
        [HttpGet("/welcome/buscarrol/{nombre}")]
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
