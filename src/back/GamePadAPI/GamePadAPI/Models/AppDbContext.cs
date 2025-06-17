using GamePadAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GamePad_TIDAI_2025.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Avaliacao> Avaliacoes { get; set; }
        // public DbSet<Jogo> Jogos { get; set; } // Removido pois jogos IGDB são usados
        public DbSet<UserGameStatus> UserGameStatuses { get; set; }
        public DbSet<ConsoleP> Consoles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Sugestao> Sugestoes { get; set; }
        public DbSet<AvaliacaoLike> AvaliacaoLikes { get; set; }

    }
}
