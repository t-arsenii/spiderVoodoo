using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

public static class UserEndpoints
{
     public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder endpoints)
     {
          PasswordHasher<object> passwordHasher = new PasswordHasher<object>();

          endpoints.MapPost("/user", ([FromBody] CreateUser createUser) =>
          {
               var user = new User()
               {
                    Username = createUser.Username,
                    PasswordHash = passwordHasher.HashPassword(null!, createUser.Password)
               };

               return Results.Ok($"User created, {user.Username}, with hashed password: {user.PasswordHash}");
          });

          endpoints.MapGet("/user/{username}", ([FromRoute] string username) =>
          {
               return Results.Ok($"User found: {username}");

          });
          endpoints.MapPut("/user/{username}", ([FromRoute] string username) =>
          {
               return Results.Ok($"User updated: {username}");

          });
          endpoints.MapDelete("/user/{username}", ([FromRoute] string username) =>
          {
               return Results.Ok($"User deleted: {username}");
          });
          return endpoints;
     }
}