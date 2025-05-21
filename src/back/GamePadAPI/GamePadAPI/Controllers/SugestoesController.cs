using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using GamePad_TIDAI_2025.Models;

namespace GamePadAPI.Controllers
{
    public class SugestoesController : Controller
    {
        private readonly AppDbContext _context;

        public SugestoesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Sugestoes
        public async Task<IActionResult> Index()
        {
            var appDbContext = _context.Sugestoes.Include(s => s.Usuario);
            return View(await appDbContext.ToListAsync());
        }

        // GET: Sugestoes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sugestao = await _context.Sugestoes
                .Include(s => s.Usuario)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (sugestao == null)
            {
                return NotFound();
            }

            return View(sugestao);
        }

        // GET: Sugestoes/Create
        public IActionResult Create()
        {
            ViewData["UsuarioId"] = new SelectList(_context.Usuarios, "Id", "Email");
            return View();
        }

        // POST: Sugestoes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Nome,Descricao,Data,UsuarioId")] Sugestao sugestao)
        {
            if (ModelState.IsValid)
            {
                _context.Add(sugestao);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["UsuarioId"] = new SelectList(_context.Usuarios, "Id", "Email", sugestao.UsuarioId);
            return View(sugestao);
        }

        // GET: Sugestoes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sugestao = await _context.Sugestoes.FindAsync(id);
            if (sugestao == null)
            {
                return NotFound();
            }
            ViewData["UsuarioId"] = new SelectList(_context.Usuarios, "Id", "Email", sugestao.UsuarioId);
            return View(sugestao);
        }

        // POST: Sugestoes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Nome,Descricao,Data,UsuarioId")] Sugestao sugestao)
        {
            if (id != sugestao.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sugestao);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SugestaoExists(sugestao.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["UsuarioId"] = new SelectList(_context.Usuarios, "Id", "Email", sugestao.UsuarioId);
            return View(sugestao);
        }

        // GET: Sugestoes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sugestao = await _context.Sugestoes
                .Include(s => s.Usuario)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (sugestao == null)
            {
                return NotFound();
            }

            return View(sugestao);
        }

        // POST: Sugestoes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var sugestao = await _context.Sugestoes.FindAsync(id);
            if (sugestao != null)
            {
                _context.Sugestoes.Remove(sugestao);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SugestaoExists(int id)
        {
            return _context.Sugestoes.Any(e => e.Id == id);
        }
    }
}
