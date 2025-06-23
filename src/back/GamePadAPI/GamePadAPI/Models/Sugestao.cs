using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GamePadAPI.Models.Interfaces;

namespace GamePad_TIDAI_2025.Models
{
    [Table("Sugestoes")]
    public class Sugestao
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Display(Name = "Nome")]
        [Required(ErrorMessage = "O campo Nome deve ser preenchido")]
        public string Nome { get; set; }

        [Display(Name = "Descrição")]
        [Required(ErrorMessage = "A descrição não pode ser vazia.")]
        public string Descricao { get; set; }

        [Display(Name = "Data")]
        [Required(ErrorMessage = "Erro na data")]
        public DateTime Data { get; set; }

        public int UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; }


        public void GetData()
        {
        }
    }
}
