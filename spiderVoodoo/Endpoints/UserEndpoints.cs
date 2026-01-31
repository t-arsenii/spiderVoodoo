using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

public static class UserEndpoints
{
     public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
     {
          var endpoints = app.MapGroup("/user");
          endpoints.MapPost("/", CreateUser);
          endpoints.MapGet("/{id}", GetUserById);
          endpoints.MapPut("/{username}", UpdateUser);
          endpoints.MapDelete("/{username}", DeleteUser);
          return app;
     }
     static async Task<Results<Ok<GetUserResponse>, NotFound>> GetUserById(string id, UserManager<User> _userManager)
     {
          var user = await _userManager.FindByIdAsync(id);
          if (user is null)
               return TypedResults.NotFound();
          var getUserResponse = new GetUserResponse(user.Id, user.UserName, user.Email);
          return TypedResults.Ok(getUserResponse);
     }
     static Results<Created<GetUserResponse>, BadRequest<IEnumerable<IdentityError>>, BadRequest> CreateUser(CreateUserRequest createUser, UserManager<User> _userManager, ApplicationDbContext dbContext)
     {
          if (string.IsNullOrEmpty(createUser.Username) || string.IsNullOrEmpty(createUser.Password))
          {
               return TypedResults.BadRequest();
          }
          var user = new User
          {
               UserName = createUser.Username
          };
          var result = _userManager.CreateAsync(user, createUser.Password).GetAwaiter().GetResult();
          if (!result.Succeeded)
               return TypedResults.BadRequest(result.Errors);

          // dbContext.SaveChanges();
          return TypedResults.Created($"/user/{user.Id}", new GetUserResponse(user.Id, user.UserName, user.Email));
     }
     static Results<Ok<string>, NotFound> DeleteUser(string username)
     {
          bool userExists = true;

          if (userExists)
          {
               return TypedResults.Ok($"User deleted: {username}");
          }
          else
          {
               return TypedResults.NotFound();
          }
     }
     static Results<Ok<string>, NotFound> UpdateUser(string username)
     {
          bool userExists = true;

          if (userExists)
          {
               return TypedResults.Ok($"User updated: {username}");
          }
          else
          {
               return TypedResults.NotFound();
          }
     }
}