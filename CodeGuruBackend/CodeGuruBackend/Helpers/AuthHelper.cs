using CodeGuruBackend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;


namespace CodeGuruBackend.Helpers
{
    public class AuthHelper
    {
  
          public string GenerateToken(User user) {
        
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(Secret.bearerKey);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {

                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(type: "Id", value: user.Id.ToString()),
                    new Claim(type: JwtRegisteredClaimNames.Sub, value: user.Username),
                    new Claim(type: JwtRegisteredClaimNames.Email, value: user.Email),
                    new Claim(type: JwtRegisteredClaimNames.GivenName, value: user.FirstName),
                    new Claim(type: JwtRegisteredClaimNames.FamilyName, value: user.LastName),
                    new Claim(type: JwtRegisteredClaimNames.Aud, value: "https://localhost:7199"),
                    new Claim(type: JwtRegisteredClaimNames.Jti, value: Guid.NewGuid().ToString())

                }),
                Issuer = "https://localhost:7199",
                Expires = DateTime.UtcNow.AddSeconds(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                                            SecurityAlgorithms.HmacSha512)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;

        }
        
    }

}
