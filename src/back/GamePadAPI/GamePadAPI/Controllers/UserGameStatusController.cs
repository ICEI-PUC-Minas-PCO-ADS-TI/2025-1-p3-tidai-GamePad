using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamePad_TIDAI_2025.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace GamePadAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserGameStatusController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserGameStatusController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/UserGameStatus/user/5
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<UserGameStatus>>> GetStatusesByUser(int userId)
        {
            return await _context.UserGameStatuses.Where(s => s.UsuarioId == userId).ToListAsync();
        }

        // GET: api/UserGameStatus/game/123456
        [HttpGet("game/{igdbGameId}")]
        public async Task<ActionResult<IEnumerable<UserGameStatus>>> GetStatusesByGame(long igdbGameId)
        {
            return await _context.UserGameStatuses.Where(s => s.IgdbGameId == igdbGameId).ToListAsync();
        }

        // POST: api/UserGameStatus
        [HttpPost]
        public async Task<ActionResult<UserGameStatus>> PostStatus(UserGameStatus status)
        {
            // Remove status duplicado do mesmo tipo para o mesmo user/game
            var existing = await _context.UserGameStatuses.FirstOrDefaultAsync(s => s.UsuarioId == status.UsuarioId && s.IgdbGameId == status.IgdbGameId && s.Status == status.Status);
            if (existing != null)
            {
                return BadRequest("Status já existe para este usuário e jogo.");
            }
            _context.UserGameStatuses.Add(status);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStatusesByUser), new { userId = status.UsuarioId }, status);
        }

        // DELETE: api/UserGameStatus/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatus(int id)
        {
            var status = await _context.UserGameStatuses.FindAsync(id);
            if (status == null)
            {
                return NotFound();
            }
            _context.UserGameStatuses.Remove(status);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/UserGameStatus?usuarioId=1&igdbGameId=6036&status=1
        [HttpDelete]
        public async Task<IActionResult> DeleteStatusByParams([FromQuery] int usuarioId, [FromQuery] long igdbGameId, [FromQuery] int status)
        {
            var statusObj = await _context.UserGameStatuses
                .FirstOrDefaultAsync(s => s.UsuarioId == usuarioId && s.IgdbGameId == igdbGameId && s.Status == (GameStatusEnum)status);
            if (statusObj == null)
            {
                return NotFound();
            }
            _context.UserGameStatuses.Remove(statusObj);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
