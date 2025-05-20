using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GamePad_TIDAI_2025.Models
{

    [Table("Consoles")]
    public class ConsoleP
    {

        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        [Display(Name = "Nome")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo plataforma é obrigatório")]
        [Display(Name = "Plataforma")]
        public string Plataforma { get; set; }

        // configurando a foreign key
        public List<Jogo> Jogos { get; set; }

    }
}
