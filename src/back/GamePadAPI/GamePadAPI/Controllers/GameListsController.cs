using GamePadAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace GamePadAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameListsController : ControllerBase
    {
        private readonly GamePad_TIDAI_2025.Models.AppDbContext _context;
        public GameListsController(GamePad_TIDAI_2025.Models.AppDbContext context)
        {
            _context = context;
        }

        // GET: api/GameLists/user/5
        [HttpGet("user/{usuarioId}")]
        public async Task<IActionResult> GetListsByUser(int usuarioId)
        {
            var lists = await _context.GameLists
                .Include(l => l.Items)
                .Where(l => l.UsuarioId == usuarioId)
                .Select(l => new {
                    l.Id,
                    l.Title,
                    l.UsuarioId,
                    Items = l.Items.Select(i => new {
                        i.Id,
                        i.IgdbGameId,
                        i.GameTitle,
                        i.CoverUrl
                    }).ToList()
                })
                .ToListAsync();
            return Ok(lists);
        }

        // GET: api/GameLists/{listId}
        [HttpGet("{listId}")]
        public async Task<IActionResult> GetListById(int listId)
        {
            var list = await _context.GameLists
                .Include(l => l.Items)
                .Include(l => l.Usuario)
                .Where(l => l.Id == listId)
                .Select(l => new {
                    l.Id,
                    l.Title,
                    l.UsuarioId,
                    OwnerName = l.Usuario.Nome,
                    OwnerImg = l.Usuario.ImgUser,
                    Items = l.Items.Select(i => new {
                        i.Id,
                        i.IgdbGameId,
                        i.GameTitle,
                        i.CoverUrl
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (list == null)
                return NotFound();

            return Ok(list);
        }

        // POST: api/GameLists
        [HttpPost]
        public async Task<IActionResult> CreateList([FromBody] GameList list)
        {
            _context.GameLists.Add(list);
            await _context.SaveChangesAsync();
            return Ok(list);
        }

        // POST: api/GameLists/{listId}/add
        [HttpPost("{listId}/add")]
        public async Task<IActionResult> AddGameToList(int listId, [FromBody] GameListItem item)
        {
            // Verifica se já existe o jogo na lista
            bool exists = await _context.GameListItems.AnyAsync(i => i.GameListId == listId && i.IgdbGameId == item.IgdbGameId);
            if (exists)
                return Conflict(new { message = "Este jogo já está na lista." });
            item.GameListId = listId;
            _context.GameListItems.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        // DELETE: api/GameLists/{listId}/remove/{itemId}
        [HttpDelete("{listId}/remove/{itemId}")]
        public async Task<IActionResult> RemoveGameFromList(int listId, int itemId)
        {
            var item = await _context.GameListItems.FirstOrDefaultAsync(i => i.Id == itemId && i.GameListId == listId);
            if (item == null) return NotFound();
            _context.GameListItems.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
