using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CodeGuruBackend.Models;

namespace CodeGuruBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QueryTemplatesController : ControllerBase
    {
        private readonly CodeGuruContext _context;

        public QueryTemplatesController(CodeGuruContext context)
        {
            _context = context;
        }

        // GET: api/QueryTemplates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QueryTemplate>>> GetQueryTemplates()
        {
          if (_context.QueryTemplates == null)
          {
              return NotFound();
          }
            return await _context.QueryTemplates.ToListAsync();
        }

        // GET: api/QueryTemplates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QueryTemplate>> GetQueryTemplate(int id)
        {
          if (_context.QueryTemplates == null)
          {
              return NotFound();
          }
            var queryTemplate = await _context.QueryTemplates.FindAsync(id);

            if (queryTemplate == null)
            {
                return NotFound();
            }

            return queryTemplate;
        }

        // PUT: api/QueryTemplates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQueryTemplate(int id, QueryTemplate queryTemplate)
        {
            if (id != queryTemplate.Id)
            {
                return BadRequest();
            }

            _context.Entry(queryTemplate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QueryTemplateExists(id))
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

        // POST: api/QueryTemplates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<QueryTemplate>> PostQueryTemplate(QueryTemplate queryTemplate)
        {
          if (_context.QueryTemplates == null)
          {
              return Problem("Entity set 'CodeGuruContext.QueryTemplates'  is null.");
          }
            _context.QueryTemplates.Add(queryTemplate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQueryTemplate", new { id = queryTemplate.Id }, queryTemplate);
        }

        // DELETE: api/QueryTemplates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQueryTemplate(int id)
        {
            if (_context.QueryTemplates == null)
            {
                return NotFound();
            }
            var queryTemplate = await _context.QueryTemplates.FindAsync(id);
            if (queryTemplate == null)
            {
                return NotFound();
            }

            _context.QueryTemplates.Remove(queryTemplate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QueryTemplateExists(int id)
        {
            return (_context.QueryTemplates?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
