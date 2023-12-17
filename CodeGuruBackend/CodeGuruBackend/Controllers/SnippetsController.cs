using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodeGuruBackend.Models;
using Microsoft.AspNetCore.Authorization;

namespace CodeGuruBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SnippetsController : ControllerBase
    {
        private readonly CodeGuruContext _context;

        public SnippetsController(CodeGuruContext context)
        {
            _context = context;
        }

        // GET: api/Snippets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Snippet>>> GetSnippets()
        {
            if (_context.Snippets == null)
            {
                return NotFound();
            }
            return await _context.Snippets.ToListAsync();
        }

        // GET: api/Snippets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Snippet>> GetSnippet(int id)
        {
            if (_context.Snippets == null)
            {
                return NotFound();
            }
            var snippet = await _context.Snippets.FindAsync(id);

            if (snippet == null)
            {
                return NotFound();
            }

            return snippet;
        }

        // PUT: api/Snippets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSnippet(int id, Snippet snippet)
        {
            if (id != snippet.Id)
            {
                return BadRequest();
            }

            _context.Entry(snippet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SnippetExists(id))
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

        // POST: api/Snippets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Snippet>> PostSnippet(Snippet snippet)
        {
            if (_context.Snippets == null)
            {
                return Problem("Entity set 'CodeGuruContext.Snippets'  is null.");
            }
            _context.Snippets.Add(snippet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSnippet", new { id = snippet.Id }, snippet);
        }

        [HttpPost("chatgpt/save")]
        public async Task<ActionResult<Snippet>> SaveChatGPTCode([FromBody] Snippet chatGptSnippet)
        {
            if (chatGptSnippet == null)
            {
                return BadRequest("Invalid data from ChatGPT");
            }

            _context.Snippets.Add(chatGptSnippet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSnippet", new { id = chatGptSnippet.Id }, chatGptSnippet);
        }
    
    
        // DELETE: api/Snippets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSnippet(int id)
        {
            if (_context.Snippets == null)
            {
                return NotFound();
            }
            var snippet = await _context.Snippets.FindAsync(id);
            if (snippet == null)
            {
                return NotFound();
            }

            _context.Snippets.Remove(snippet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SnippetExists(int id)
        {
            return (_context.Snippets?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
