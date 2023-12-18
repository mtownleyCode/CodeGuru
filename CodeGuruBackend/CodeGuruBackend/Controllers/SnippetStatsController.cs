using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodeGuruBackend.Models;

namespace CodeGuruBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SnippetStatsController : ControllerBase
    {
        private readonly CodeGuruContext _context;

        public SnippetStatsController(CodeGuruContext context)
        {
            _context = context;
        }

        // GET: api/SnippetStats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SnippetStat>>> GetSnippetStats()
        {
          if (_context.SnippetStats == null)
          {
              return NotFound();
          }
            return await _context.SnippetStats.ToListAsync();
        }

        //Get /favorites/5
        [HttpPost("favorites")]
        public async Task<ActionResult<IEnumerable<Snippet>>> GetFavorites([FromBody]int id)
        {
            if (_context.Snippets == null)
            {
                return NotFound();
            }

            List<SnippetStat> stats = _context.SnippetStats.Where(ss => ss.UserId == id).ToList();

            List<Snippet> snippets = new List<Snippet>();

            foreach (SnippetStat stat in stats)
            {
                Snippet snippetToAdd = _context.Snippets.First(s => s.Id == stat.SnippetId);
                snippets.Add(snippetToAdd);
            }

            return snippets;


        }

        // GET: api/SnippetStats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SnippetStat>> GetSnippetStat(int id)
        {
          if (_context.SnippetStats == null)
          {
              return NotFound();
          }
            var snippetStat = await _context.SnippetStats.FindAsync(id);

            if (snippetStat == null)
            {
                return NotFound();
            }

            return snippetStat;
        }

        // PUT: api/SnippetStats/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSnippetStat(int id, SnippetStat snippetStat)
        {
            if (id != snippetStat.Id)
            {
                return BadRequest();
            }

            _context.Entry(snippetStat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SnippetStatExists(id))
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

        // POST: api/SnippetStats
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SnippetStat>> PostSnippetStat(SnippetStat snippetStat)
        {
          if (_context.SnippetStats == null)
          {
              return Problem("Entity set 'CodeGuruContext.SnippetStats'  is null.");
          }
            _context.SnippetStats.Add(snippetStat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSnippetStat", new { id = snippetStat.Id }, snippetStat);
        }

        // DELETE: api/SnippetStats/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSnippetStat(int id)
        {
            if (_context.SnippetStats == null)
            {
                return NotFound();
            }
            var snippetStat = await _context.SnippetStats.FindAsync(id);
            if (snippetStat == null)
            {
                return NotFound();
            }

            _context.SnippetStats.Remove(snippetStat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SnippetStatExists(int id)
        {
            return (_context.SnippetStats?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
