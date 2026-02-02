using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

public static class LoginEndpoints
{
     public static IEndpointRouteBuilder MapLoginEndpoints(this IEndpointRouteBuilder app)
     {
          var endpoints = app.MapGroup("/login");
          endpoints.MapPost("/", LoginUser);
          return app;
     }
     static async Task<Results<Ok<LoginResponse>, UnauthorizedHttpResult>> LoginUser(LoginRequest loginRequest, UserManager<User> _userManager, SignInManager<User> _signInManager, IConfiguration configuration)
     {
          var user = await _userManager.FindByEmailAsync(loginRequest.Email);
          if (user is null)
               return TypedResults.Unauthorized();

          var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);
          if (!result.Succeeded)
               return TypedResults.Unauthorized();


          var tokenHandler = new JsonWebTokenHandler();
          var token = tokenHandler.CreateToken(new SecurityTokenDescriptor()
          {
               Subject = new ClaimsIdentity(new[]
               {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email!)
               }),
               Expires = DateTime.UtcNow.AddHours(1),
               Issuer = configuration["Jwt:Issuer"],
               Audience = configuration["Jwt:Audience"],
               SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)), SecurityAlgorithms.HmacSha256)
          });

          return TypedResults.Ok(new LoginResponse(token));
     }
}