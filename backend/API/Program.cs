using System.Net;
using System.Text;
using API.Data;
using API.Interfaces;
using API.Interfaces.Account;
using API.Models;
using API.Repositories.Student;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure; // Add this for MySQL configuration

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp",
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000") // React app URL
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
        });
        // var certPath = Path.Combine(Directory.GetCurrentDirectory(), "localhost.crt");

        // builder.WebHost.ConfigureKestrel(options =>
        // {
        //     options.Listen(IPAddress.Any, 5149, listenOptions =>
        //     {
        //         listenOptions.UseHttps(certPath, "1234");
        //     });
        // });


        // Configure DbContext for MySQL
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), 
                new MySqlServerVersion(new Version(8, 0, 39)))); // Use your actual MySQL version here

        builder.Services.AddHttpClient();

        // Add Identity with custom ApplicationUser
        builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
            // Configure Password Policy
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 8;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireLowercase = true;
        })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

        // JWT Authentication setup
        var key = Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"]);
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
                ValidAudience = builder.Configuration["JwtSettings:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero // Removes the default 5-minute delay
            };
        });

        builder.Services.AddAuthorization();

        // Add services and repositories
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<IStudentRepository, StudentRepository>();

        var app = builder.Build();
        app.UseWebSockets();
        app.Use(async (context, next) =>
        {
            if (context.Request.IsHttps)
            {
                var socket = await context.WebSockets.AcceptWebSocketAsync();
                // Handle the socket connection
            }
            else
            {
                await next();
            }
        });

        // Role creation logic on app startup
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;

            try
            {
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

                // Create roles if they do not exist
                await CreateRolesAsync(roleManager);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating roles: {ex.Message}");
            }
        }

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("AllowReactApp");

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        // app.UseHttpsRedirection();

        await app.RunAsync();
    }

    // Role creation logic
    private static async Task CreateRolesAsync(RoleManager<IdentityRole> roleManager)
    {
        string[] roleNames = { "Student", "Teacher" };

        foreach (var roleName in roleNames)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                // Create the role if it doesn't exist
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }
    }
}
