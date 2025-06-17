using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamePad_TIDAI_2025.Models;

namespace GamePadAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvaliacoesApiController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AvaliacoesApiController(AppDbContext context)
        {
            _context = context;
        }

        // DTO para evitar referência circular
        public class AvaliacaoDto
        {
            public int Id { get; set; }
            public string Nota { get; set; }
            public string Comentario { get; set; }
            public DateTime Data { get; set; }
            public int UsuarioId { get; set; }
            public string UsuarioNome { get; set; }
            public string UsuarioImg { get; set; }
            public long IgdbGameId { get; set; }
        }

        // GET: api/AvaliacoesApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AvaliacaoDto>>> GetAvaliacoes()
        {
            return await _context.Avaliacoes
                .Include(a => a.Usuario)
                .Select(a => new AvaliacaoDto
                {
                    Id = a.Id,
                    Nota = a.Nota,
                    Comentario = a.Comentario,
                    Data = a.Data,
                    UsuarioId = a.UsuarioId,
                    UsuarioNome = a.Usuario.Nome,
                    UsuarioImg = a.Usuario.ImgUser,
                    IgdbGameId = a.IgdbGameId ?? 0
                })
                .ToListAsync();
        }

        // GET: api/AvaliacoesApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Avaliacao>> GetAvaliacao(int id)
        {
            var avaliacao = await _context.Avaliacoes.Include(a => a.Usuario).FirstOrDefaultAsync(a => a.Id == id);

            if (avaliacao == null)
            {
                return NotFound();
            }

            return avaliacao;
        }

        // POST: api/AvaliacoesApi
        [HttpPost]
        public async Task<ActionResult<Avaliacao>> PostAvaliacao(Avaliacao avaliacao)
        {
            // Permite avaliação por estrelas sem comentário,
            // mas se enviar comentário, nota deve ser maior que zero
            if (!string.IsNullOrWhiteSpace(avaliacao.Comentario) && (string.IsNullOrWhiteSpace(avaliacao.Nota) || avaliacao.Nota == "0"))
            {
                return BadRequest("Para comentar, é necessário dar uma nota ao jogo.");
            }
            // Permite nota sem comentário
            _context.Avaliacoes.Add(avaliacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAvaliacao), new { id = avaliacao.Id }, avaliacao);
        }

        // PUT: api/AvaliacoesApi/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAvaliacao(int id, Avaliacao avaliacao)
        {
            if (id != avaliacao.Id)
            {
                return BadRequest();
            }

            _context.Entry(avaliacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Avaliacoes.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/AvaliacoesApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvaliacao(int id)
        {
            var avaliacao = await _context.Avaliacoes.FindAsync(id);
            if (avaliacao == null)
            {
                return NotFound();
            }

            _context.Avaliacoes.Remove(avaliacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/AvaliacoesApi/medias?minMedia=4
        [HttpGet("medias")]
        public async Task<ActionResult<IEnumerable<object>>> GetMedias([FromQuery] double? minMedia = null)
        {
            // Agrupa avaliações por jogo e calcula a média
            var medias = await _context.Avaliacoes
                .Where(a => a.IgdbGameId != null && a.Nota != null && a.Nota != "")
                .ToListAsync();

            var mediasPorJogo = medias
                .GroupBy(a => a.IgdbGameId)
                .Select(g => new {
                    IgdbGameId = g.Key,
                    Media = g.Average(a => double.Parse(a.Nota))
                })
                .ToList();

            if (minMedia.HasValue)
            {
                mediasPorJogo = mediasPorJogo.Where(m => m.Media >= minMedia.Value).ToList();
            }
            return Ok(mediasPorJogo);
        }

        // POST: api/AvaliacoesApi/{id}/like
        [HttpPost("{id}/like")]
        public async Task<IActionResult> LikeAvaliacao(int id, [FromQuery] int usuarioId)
        {
            var avaliacao = await _context.Avaliacoes.FindAsync(id);
            if (avaliacao == null) return NotFound();
            if (avaliacao.UsuarioId == usuarioId) return BadRequest("Não pode curtir o próprio comentário.");
            var existing = await _context.AvaliacaoLikes.FirstOrDefaultAsync(l => l.AvaliacaoId == id && l.UsuarioId == usuarioId);
            if (existing != null) return BadRequest("Já curtiu este comentário.");
            _context.AvaliacaoLikes.Add(new AvaliacaoLike { AvaliacaoId = id, UsuarioId = usuarioId });
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE: api/AvaliacoesApi/{id}/like?usuarioId=123
        [HttpDelete("{id}/like")]
        public async Task<IActionResult> UnlikeAvaliacao(int id, [FromQuery] int usuarioId)
        {
            var like = await _context.AvaliacaoLikes.FirstOrDefaultAsync(l => l.AvaliacaoId == id && l.UsuarioId == usuarioId);
            if (like == null) return NotFound();
            _context.AvaliacaoLikes.Remove(like);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // GET: api/AvaliacoesApi/likes/{avaliacaoId}
        [HttpGet("likes/{avaliacaoId}")]
        public async Task<ActionResult<object>> GetLikes(int avaliacaoId, [FromQuery] int? usuarioId = null)
        {
            var count = await _context.AvaliacaoLikes.CountAsync(l => l.AvaliacaoId == avaliacaoId);
            bool isLiked = false;
            if (usuarioId.HasValue)
            {
                isLiked = await _context.AvaliacaoLikes.AnyAsync(l => l.AvaliacaoId == avaliacaoId && l.UsuarioId == usuarioId.Value);
            }
            return Ok(new { count, isLiked });
        }
    }
}
