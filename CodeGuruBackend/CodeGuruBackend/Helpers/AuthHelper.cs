using RestSharp;
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

            var key = Encoding.ASCII.GetBytes(Secret.APIKey);

            var test = Guid.NewGuid().ToString();

            var tokenDescriptor = new SecurityTokenDescriptor()
            {

                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(type: "Id", value: user.Id.ToString()),
                    new Claim(type: JwtRegisteredClaimNames.Sub, value: user.Username),
                    new Claim(type: JwtRegisteredClaimNames.Email, value: user.Email),
                    new Claim(type: JwtRegisteredClaimNames.GivenName, value: user.FirstName),
                    new Claim(type: JwtRegisteredClaimNames.FamilyName, value: user.LastName),
                    new Claim(type: JwtRegisteredClaimNames.Jti, value: Guid.NewGuid().ToString())
                    
                }),

                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                                                            SecurityAlgorithms.HmacSha512)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;

        }
        
    }

}
