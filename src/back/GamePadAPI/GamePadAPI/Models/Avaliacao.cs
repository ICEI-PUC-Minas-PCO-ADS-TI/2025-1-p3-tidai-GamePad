using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using GamePad_TIDAI_2025.Models;

namespace GamePadAPI.Models
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
            [Required(ErrorMessage = "O comentário não pode ter menos de 50 caracteres.")]
            public string Comentario { get; set; }
            [Display(Name = "Data")]
            public DateTime Data { get; set; }

            [ForeignKey("Usuarios")]
            public int UsuarioId { get; set; }
            [ForeignKey("Jogos")]
            public int JogoId { get; set; }







    }
    }

