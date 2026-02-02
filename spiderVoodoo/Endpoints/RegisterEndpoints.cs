using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

public static class RegisterEndpoints
{
     public static IEndpointRouteBuilder MapRegisterEndpoints(this IEndpointRouteBuilder app)
     {
          var endpoints = app.MapGroup("/register");
          endpoints.MapPost("/", RegisterUser);
          return app;
     }
     static async Task<Results<Created<RegisterUserResponse>, BadRequest<IEnumerable<IdentityError>>, BadRequest>> RegisterUser(RegisterUserRequest registerUser, UserManager<User> _userManager, ApplicationDbContext dbContext)
     {
          if (string.IsNullOrEmpty(registerUser.Username) || string.IsNullOrEmpty(registerUser.Password))
          {
               return TypedResults.BadRequest();
          }
          var user = new User
          {
               UserName = registerUser.Username,
               Email = registerUser.Email
          };
          var result = await _userManager.CreateAsync(user, registerUser.Password);
          if (!result.Succeeded)
               return TypedResults.BadRequest(result.Errors);

          return TypedResults.Created($"/users/{user.Id}", new RegisterUserResponse(user.Id, user.UserName, user.Email));
     }
}