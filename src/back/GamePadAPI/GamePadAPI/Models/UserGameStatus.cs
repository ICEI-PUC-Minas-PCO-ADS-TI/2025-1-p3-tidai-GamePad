using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GamePad_TIDAI_2025.Models
{
    [Table("UserGameStatuses")]
    public class UserGameStatus
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; }

        [Required]
        public long IgdbGameId { get; set; }

        [Required]
        public GameStatusEnum Status { get; set; }
    }

    public enum GameStatusEnum
    {
        Jogando = 0,
        Zerado = 1,
        Wishlist = 2,
        Curtido = 3
    }
}
