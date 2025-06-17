using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace GamePad_TIDAI_2025.Models
{
    [Table("AvaliacaoLikes")]
    public class AvaliacaoLike
    {
        [Key]
        public int Id { get; set; }
        public int AvaliacaoId { get; set; }
        public int UsuarioId { get; set; }
        public DateTime Data { get; set; } = DateTime.UtcNow;
    }
}
