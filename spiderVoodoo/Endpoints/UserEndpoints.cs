using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

public static class UserEndpoints
{
     public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
     {
          var endpoints = app.MapGroup("/users");
          endpoints.RequireAuthorization();
          endpoints.MapPost("/", CreateUser);
          endpoints.MapGet("/{id}", GetUserById);
          endpoints.MapPut("/{id}", UpdateUser);
          endpoints.MapDelete("/{id}", DeleteUser);
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
     static async Task<Results<Created<CreateUserResponse>, BadRequest<IEnumerable<IdentityError>>, BadRequest>> CreateUser(CreateUserRequest createUser, UserManager<User> _userManager, ApplicationDbContext dbContext)
     {
          if (string.IsNullOrEmpty(createUser.Username) || string.IsNullOrEmpty(createUser.Password) || string.IsNullOrEmpty(createUser.Email))
          {
               return TypedResults.BadRequest();
          }
          var user = new User
          {
               UserName = createUser.Username,
               Email = createUser.Email
          };
          var result = await _userManager.CreateAsync(user, createUser.Password);
          if (!result.Succeeded)
               return TypedResults.BadRequest(result.Errors);

          return TypedResults.Created($"/users/{user.Id}", new CreateUserResponse(user.Id, user.UserName, user.Email));
     }
     static Results<Ok<string>, NotFound> DeleteUser(string id)
     {
          bool userExists = true;

          if (userExists)
          {
               return TypedResults.Ok($"User deleted: {id}");
          }
          else
          {
               return TypedResults.NotFound();
          }
     }
     static Results<Ok<string>, NotFound> UpdateUser(string id)
     {
          bool userExists = true;

          if (userExists)
          {
               return TypedResults.Ok($"User updated: {id}");
          }
          else
          {
               return TypedResults.NotFound();
          }
     }
}