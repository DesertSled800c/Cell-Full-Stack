using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Cell.Models
{
    public class Tag
    {
        public int Id { get; set; }

        [Required]
        [DisplayName("Tag Name")]
        public string Name { get; set; }
    }
}