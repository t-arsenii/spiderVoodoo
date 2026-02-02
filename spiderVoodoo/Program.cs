using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
     options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services
    .AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddAuthentication(options =>
{
     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
     options.TokenValidationParameters.ValidIssuer = builder.Configuration["Jwt:Issuer"];
     options.TokenValidationParameters.ValidAudience = builder.Configuration["Jwt:Audience"];
     options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!));

});
builder.Services.AddAuthorization();
var app = builder.Build();

app.UseCors(builder =>
{
    builder.WithOrigins(new string[]{"http://localhost:5173"}).AllowAnyHeader().AllowAnyMethod();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapUserEndpoints();
app.MapLoginEndpoints();
app.Run();