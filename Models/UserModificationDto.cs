using System.ComponentModel.DataAnnotations;
namespace LoginAdmin.Models
{
    public class rolModificationDto
    {
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        
    }
}