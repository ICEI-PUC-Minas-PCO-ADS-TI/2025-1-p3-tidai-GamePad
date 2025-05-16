using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GamePadAPI.Models
{
    [Table("Jogos")]
    public class Jogo
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }


        [Display(Name = "Nome")]
        [Required(ErrorMessage = "O campo Nome deve ser preenchido")]
        public string Nome { get; set; }


        [Display(Name = "Descrição")]
        [Required(ErrorMessage = "A descrição não pode conter menos de 50 caracteres")]
        public string Descricao { get; set; }

        [Display(Name = "URL")]
        [Required(ErrorMessage = "O jogo deve ter uma capa")]
        public string UrlCapa { get; set; }


        [Required(ErrorMessage = "O jogo deve ter um gênero")]
        [Display(Name = "Genero")]
        public string Genero { get; set; }



        [ForeignKey("Consoles")]
        public int ConsolePId { get; set; }


        //Devol???
        //Avaliacao fazer depois
        //public double MediaAvaliacao { get; set; } (Pensar na implementação)
    }
}
