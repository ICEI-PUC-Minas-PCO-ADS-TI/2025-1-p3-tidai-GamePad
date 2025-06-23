using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GamePadAPI.Models.Interfaces;

namespace GamePad_TIDAI_2025.Models
{
    [Table("Posts")]
    public class Post : IPost
    {
        [Key]
        [Display(Name = "id")]
        public int Id { get; set; }

        [Display(Name = "Título")]
        public string Titulo { get; set; }

        [Required(ErrorMessage = "A descrição não pode ser vazia.")]
        [Display(Name = "Descrição")]
        public string Descricao { get; set; }

        [Display(Name = "Link")]
        public string Link { get; set; }

        [Required(ErrorMessage = "Erro data")]
        [Display(Name = "Data")]
        public DateTime Data { get; set; }

        
        public int UsuarioId { get; set; }
        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; }


        public void GetData()
        {
        }
    }
}
