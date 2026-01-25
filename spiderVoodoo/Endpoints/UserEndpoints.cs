using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

public static class UserEndpoints
{
     public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder endpoints)
     {
          PasswordHasher<object> passwordHasher = new PasswordHasher<object>();
          var userGroup = endpoints.MapGroup("/user");

          userGroup.MapPost("/", ([FromBody] CreateUser createUser) =>
          {
               var user = new User()
               {
                    Username = createUser.Username,
                    PasswordHash = passwordHasher.HashPassword(null!, createUser.Password)
               };

               return Results.Ok($"User created, {user.Username}, with hashed password: {user.PasswordHash}");
          });

          userGroup.MapGet("/{username}", ([FromRoute] string username) =>
          {
               return Results.Ok($"User found: {username}");

          });
          userGroup.MapPut("/{username}", ([FromRoute] string username) =>
          {
               return Results.Ok($"User updated: {username}");

          });
          userGroup.MapDelete("/{username}", ([FromRoute] string username) =>
          {
               return Results.Ok($"User deleted: {username}");
          });
          return endpoints;
     }
}