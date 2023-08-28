using System.ComponentModel.DataAnnotations;

namespace LoginAdmin.Models
{
    public class RolCreationDto
    {
        [Required]
        public int rol_codRol { get; set; } 
        [Required]
        public string rol_Nombre { get; set; } = string.Empty;


    }
}