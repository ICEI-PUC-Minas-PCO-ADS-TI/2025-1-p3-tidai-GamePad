using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GamePadAPI.Models.Interfaces;

namespace GamePad_TIDAI_2025.Models
{
    [Table("Usuarios")]
    public class Usuario : IUsuario
    {
        [Key]
        [Display(Name = "Id")]
        public int Id { get; set; }
        [Display(Name = "Nome")]
        [Required(ErrorMessage = "O campo Nome deve ser preenchido")]
        public string Nome { get; set; }
        [Display(Name = "E-mail")]
        [Required(ErrorMessage = "O campo E-mail deve ser preenchido")]
        [EmailAddress(ErrorMessage = "E-mail inválido!")]
        public string Email { get; set; }
        [Display(Name = "Senha")]
        [Required(ErrorMessage = "O campo Senha deve ser preenchido")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        public string ImgUser { get; set; }
        public string Tipo { get; set; }

        public string Bio { get; set; } // Biografia do usuário

        // Armazena os IDs dos jogos favoritos do IGDB em formato JSON (ex: [123,456,789])
        public string FavoriteGames { get; set; }

        public List<Avaliacao> Avaliacoes { get; set; }
        public List<Post> Posts { get; set; }
        public List<Sugestao> Sugestoes { get; set; }

    }

    }


