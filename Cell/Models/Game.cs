using System.ComponentModel.DataAnnotations;

namespace Cell.Models
{
    public class Game
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        [Required]
        public string Body { get; set; }
        public User User { get; set; }
    }
}
