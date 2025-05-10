using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamePadAPI.Models;
using GamePad_TIDAI_2025.Models;

namespace GamePadAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsolePController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ConsolePController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ConsoleP
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConsoleP>>> GetConsoles()
        {
            return await _context.Consoles.ToListAsync();
        }

        // GET: api/ConsoleP/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ConsoleP>> GetConsoleP(int id)
        {
            var consoleP = await _context.Consoles.FindAsync(id);

            if (consoleP == null)
            {
                return NotFound();
            }

            return consoleP;
        }

        // PUT: api/ConsoleP/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsoleP(int id, ConsoleP consoleP)
        {
            if (id != consoleP.Id)
            {
                return BadRequest();
            }

            _context.Entry(consoleP).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsolePExists(id))
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

        // POST: api/ConsoleP
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ConsoleP>> PostConsoleP(ConsoleP consoleP)
        {
            _context.Consoles.Add(consoleP);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConsoleP", new { id = consoleP.Id }, consoleP);
        }

        // DELETE: api/ConsoleP/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConsoleP(int id)
        {
            var consoleP = await _context.Consoles.FindAsync(id);
            if (consoleP == null)
            {
                return NotFound();
            }

            _context.Consoles.Remove(consoleP);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConsolePExists(int id)
        {
            return _context.Consoles.Any(e => e.Id == id);
        }
    }
}
