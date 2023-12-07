using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodeGuruBackend.Models;

namespace CodeGuruBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KeyWordsController : ControllerBase
    {
        private readonly CodeGuruContext _context;

        public KeyWordsController(CodeGuruContext context)
        {
            _context = context;
        }

        // GET: api/KeyWords
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KeyWord>>> GetKeyWords()
        {
          if (_context.KeyWords == null)
          {
              return NotFound();
          }
            return await _context.KeyWords.ToListAsync();
        }

        // GET: api/KeyWords/5
        [HttpGet("{id}")]
        public async Task<ActionResult<KeyWord>> GetKeyWord(int id)
        {
          if (_context.KeyWords == null)
          {
              return NotFound();
          }
            var keyWord = await _context.KeyWords.FindAsync(id);

            if (keyWord == null)
            {
                return NotFound();
            }

            return keyWord;
        }

        // PUT: api/KeyWords/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKeyWord(int id, KeyWord keyWord)
        {
            if (id != keyWord.Id)
            {
                return BadRequest();
            }

            _context.Entry(keyWord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KeyWordExists(id))
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

        // POST: api/KeyWords
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<KeyWord>> PostKeyWord(KeyWord keyWord)
        {
          if (_context.KeyWords == null)
          {
              return Problem("Entity set 'CodeGuruContext.KeyWords'  is null.");
          }
            _context.KeyWords.Add(keyWord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKeyWord", new { id = keyWord.Id }, keyWord);
        }

        // DELETE: api/KeyWords/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKeyWord(int id)
        {
            if (_context.KeyWords == null)
            {
                return NotFound();
            }
            var keyWord = await _context.KeyWords.FindAsync(id);
            if (keyWord == null)
            {
                return NotFound();
            }

            _context.KeyWords.Remove(keyWord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KeyWordExists(int id)
        {
            return (_context.KeyWords?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
