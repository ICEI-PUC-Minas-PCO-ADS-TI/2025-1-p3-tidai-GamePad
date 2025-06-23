using GamePadAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GamePad_TIDAI_2025.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Avaliacao> Avaliacoes { get; set; }
        public DbSet<UserGameStatus> UserGameStatuses { get; set; }
        public DbSet<ConsoleP> Consoles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Sugestao> Sugestoes { get; set; }
        public DbSet<AvaliacaoLike> AvaliacaoLikes { get; set; }
        public DbSet<GameList> GameLists { get; set; }
        public DbSet<GameListItem> GameListItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Nome)
                .IsUnique();
        }
    }
}
