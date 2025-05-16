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


    /*

        //public Perfil Perfil { get; set; }

    }
        /*public enum Perfil
        {
            Creator,
            Admin,
            User
        }
        
        */



    }

    }

}

        //public Usuario(int id, string nome, string email, string senha, string imgUser, string tipo)
        //{
        //    this.Id = id;
        //    this.Nome = nome;
        //    this.Email = email;
        //    this.Senha = senha;
        //    this.ImgUser = imgUser;
        //    this.Tipo = tipo;
        //}
