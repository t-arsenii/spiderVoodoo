using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

PasswordHasher<object> passwordHasher = new PasswordHasher<object>();
app.MapGet("/user", ([FromBody] CreateUser createUser) =>
{
     var user = new User()
     {
          Username = createUser.Username,
          PasswordHash = passwordHasher.HashPassword(null!, createUser.Password)
     };

     return Results.Ok($"User created, {user.Username}, with hashed password: {user.PasswordHash}");
});

app.Run();