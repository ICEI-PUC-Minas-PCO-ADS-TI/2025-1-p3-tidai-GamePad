using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamePad_TIDAI_2025.Models;
using Microsoft.AspNetCore.Authorization;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GamePadAPI.Controllers
{
    [AllowAnonymous]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public object BC { get; private set; }

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        public class LoginDto
        {
            public string Email { get; set; }
            public string Senha { get; set; }
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // GET: api/Usuarios/tipo/{tipo}
        [HttpGet("tipo/{tipo}")]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuariosPorTipo(string tipo)
        {
            var usuarios = await _context.Usuarios
                .Where(u => u.Tipo == tipo)
                .ToListAsync();

            if (usuarios == null || usuarios.Count == 0)
            {
                return NotFound();
            }

            return usuarios;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, Usuario usuario)
        {
            if (id != usuario.Id)
            {
                return BadRequest();
            }

            var usuarioDb = await _context.Usuarios.FindAsync(id);
            if (usuarioDb == null)
            {
                return NotFound();
            }

            // Atualize apenas os campos permitidos
            usuarioDb.Nome = usuario.Nome ?? usuarioDb.Nome;
            usuarioDb.Bio = usuario.Bio ?? usuarioDb.Bio;
            usuarioDb.Email = usuario.Email ?? usuarioDb.Email;
            usuarioDb.Tipo = usuario.Tipo ?? usuarioDb.Tipo;
            usuarioDb.ImgUser = usuario.ImgUser ?? usuarioDb.ImgUser;

            // Atualize favoriteGames se vier preenchido
            if (usuario.FavoriteGames != null)
                usuarioDb.FavoriteGames = usuario.FavoriteGames;

            // Atualize senha se vier preenchida
            if (!string.IsNullOrWhiteSpace(usuario.Senha))
                usuarioDb.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
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

        // POST: api/Usuarios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.Id }, usuario);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] LoginDto model)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == model.Email);

            if (usuario == null || (!BCrypt.Net.BCrypt.Verify(model.Senha, usuario.Senha)))
                return NotFound(new { Message = "Email e/ou senha Inválidos!" });

            var jwtToken = GenerateJwtToken(usuario);

            return Ok(new { jwt = jwtToken });
        }

        private string GenerateJwtToken(Usuario usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("ueiauiueiuajksajksjakjeiuekekjaskjkajsu3eeakjskjaskjskasjksj");
            var claims = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email),
                //new Claim(ClaimTypes.Role, usuario.PerfiL)
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                                   SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // DTO para upload de imagem (necessário para Swagger funcionar)
        public class UploadImageDto
        {
            public IFormFile Image { get; set; }
        }

        // POST: api/Usuarios/{id}/upload-image
        [HttpPost("{id}/upload-image")]
        [AllowAnonymous]
        public async Task<IActionResult> UploadProfileImage(int id, [FromForm] UploadImageDto dto)
        {
            var image = dto.Image;
            if (image == null || image.Length == 0)
                return BadRequest(new { message = "Nenhuma imagem enviada." });

            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
                return NotFound(new { message = "Usuário não encontrado." });

            // Crie a pasta se não existir
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "profile-images");
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            // Nome único para a imagem
            var ext = Path.GetExtension(image.FileName);
            var fileName = $"user_{id}_{Guid.NewGuid().ToString().Substring(0, 8)}{ext}";
            var filePath = Path.Combine(folder, fileName);

            // Salva o arquivo
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            // Caminho público para acessar a imagem
            var imgUserPath = $"/profile-images/{fileName}";
            usuario.ImgUser = imgUserPath;
            await _context.SaveChangesAsync();

            return Ok(new { imgUser = imgUserPath });
        }
    }
}
