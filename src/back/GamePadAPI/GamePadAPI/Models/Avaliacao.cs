using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using GamePad_TIDAI_2025.Models;

namespace GamePad_TIDAI_2025.Models
{
    [Table("Avaliacoes")]
    public class Avaliacao
    {
            [Key]
            [Display(Name = "Id")]
            public int Id { get; set; }
            [Display(Name = "Nota")]
            [Required(ErrorMessage = "Avalie o jogo!")]
            public string Nota { get; set; }
            [Display(Name = "Comentário")]
            public string Comentario { get; set; }
            [Display(Name = "Data")]
            public DateTime Data { get; set; }

            public int UsuarioId { get; set; }
            
            [ForeignKey("UsuarioId")]
            public Usuario Usuario { get; set; }



            public long? IgdbGameId { get; set; }
    }
}

