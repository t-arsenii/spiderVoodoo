using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
     static Results<Ok<User>, NotFound> GetUserById(string id)
     {
          var user = new User()
          {
               Username = "exampleUser",
               PasswordHash = "hashedPassword"
          };

          if (user != null)
          {
               return TypedResults.Ok(user);
          }
          else
          {
               return TypedResults.NotFound();
          }
     }
     static Results<Created<User>, BadRequest> CreateUser(CreateUser createUser, PasswordHasher<object> passwordHasher)
     {
          if (string.IsNullOrEmpty(createUser.Username) || string.IsNullOrEmpty(createUser.Password))
          {
               return TypedResults.BadRequest();
          }

          var user = new User()
          {
               Username = createUser.Username,
               PasswordHash = passwordHasher.HashPassword(null!, createUser.Password)
          };

          return TypedResults.Created($"/user/{user.Username}", user);
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