using CodeGuruBackend.Helpers;
using CodeGuruBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace CodeGuruBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CodeGuruContext _context;
        private readonly ILogger<AuthController> _logger;

        public AuthController(CodeGuruContext context, 
                              ILogger<AuthController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user != null)
            {
                AuthHelper authHelper = new AuthHelper();                
                User requestedUser = new User();
                
                requestedUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
                
                if (requestedUser != null)
                {
                    return BadRequest(error: "Email already exists.");

                }

                requestedUser = new User();
                {
                    requestedUser.Username = user.Username;
                    requestedUser.Password = user.Password;
                    requestedUser.FirstName = user.FirstName;
                    requestedUser.LastName = user.LastName;
                    requestedUser.UserRole = user.UserRole;
                    requestedUser.Email = user.Email;
                };

                var isCreated = await _context.Users.AddAsync(requestedUser);
                await _context.SaveChangesAsync();

                if (isCreated != null)
                {
                    if (user.Password == "google")
                    {
                        return Ok();
                    }

                    var token = authHelper.GenerateToken(requestedUser);

                    return Ok(new RegistrationRequestResponse()
                    {
                        Result = true,
                        Token = token

                    });

                }

                return BadRequest(error: "Did not create new user.");

            }
            
            return BadRequest(error: "Invalid request.");
            
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> GetTokenFromLogin([FromBody] LoginCredentials loginCredentials)
        {

            if (loginCredentials == null)
            {
                return BadRequest("Invalid Request");

            }

            AuthHelper authHelper = new AuthHelper();

            User foundUser = _context.Users.FirstOrDefault(u => u.Email == loginCredentials.Email && u.Password == loginCredentials.Password);

            if (foundUser != null)
                foundUser.Password = "";

            if (foundUser != null)
            {
                string token = authHelper.GenerateToken(foundUser);

                foundUser.Token = token;

                return foundUser;
            
            }
            
            return Problem("Entity set 'CodeGuruContext.Users' is null.");


        }

    }
}
