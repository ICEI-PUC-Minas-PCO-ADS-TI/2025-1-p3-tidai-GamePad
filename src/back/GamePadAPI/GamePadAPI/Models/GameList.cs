using System.Collections.Generic;
using GamePad_TIDAI_2025.Models;

namespace GamePadAPI.Models
{
    public class GameList
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public List<GameListItem> Items { get; set; } = new List<GameListItem>();
    }

    public class GameListItem
    {
        public int Id { get; set; }
        public int GameListId { get; set; }
        public GameList GameList { get; set; }
        public long IgdbGameId { get; set; }
        public string GameTitle { get; set; }
        public string CoverUrl { get; set; }
    }
}
