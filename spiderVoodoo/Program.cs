using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

PasswordHasher<object> passwordHasher = new PasswordHasher<object>();

app.MapPost("/user", ([FromBody] CreateUser createUser) =>
{
     var user = new User()
     {
          Username = createUser.Username,
          PasswordHash = passwordHasher.HashPassword(null!, createUser.Password)
     };

     return Results.Ok($"User created, {user.Username}, with hashed password: {user.PasswordHash}");
});

app.MapGet("/user/{username}", ([FromRoute] string username) =>
{
     return Results.Ok($"User found: {username}");

});
app.MapPut("/user/{username}", ([FromRoute] string username) =>
{
     return Results.Ok($"User updated: {username}");

});
app.MapDelete("/user/{username}", ([FromRoute] string username) =>
{
     return Results.Ok($"User deleted: {username}");
});
app.Run();