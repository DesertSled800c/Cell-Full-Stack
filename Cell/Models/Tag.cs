using System.ComponentModel.DataAnnotations;

namespace Cell.Models
{
    public class Tag
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}