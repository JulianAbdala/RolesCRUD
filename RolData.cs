using LoginAdmin.Models;

namespace LoginAdmin
{
    public class rolData  
    {
        //public static rolsData UniqueInstance { get; } = new rolsData(); // Permite que se mantenga el orden de la lista
        public List<rolDto> rols { get; set; }

        public rolData()
        {
            rols = new List<rolDto>
            {
                new rolDto()
                {
                    Id = 1,
                    Name = "rol1",
                },
                new rolDto()
                {
                    Id = 2,
                    Name = "rol2",
                },
                new rolDto()
                {
                    Id = 3,
                    Name = "rol3",
                    
                }
            };
        }
    }
}