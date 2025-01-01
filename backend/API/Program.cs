using System.Net;
using System.Text;
using API.Data;
using API.Hubs;
using API.Interfaces;
using API.Interfaces.Account;
using API.Interfaces.Contesttt;
using API.Interfaces.Evalution;
using API.Interfaces.Excution;
using API.Interfaces.Problema;
using API.Interfaces.Submissionn;
using API.Interfaces.testcase;
using API.Models;
using API.Repositories;
using API.Repositories.Contesttt;
using API.Repositories.ProblemRe;
using API.Repositories.Student;
using API.Services;
using AspNetCoreRateLimit;
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

        builder.Services.AddMemoryCache();
        builder.Services.Configure<IpRateLimitOptions>(options =>
        {
            options.GeneralRules = new List<RateLimitRule>
            {
                new RateLimitRule
                {
                    Endpoint = "*:/api/contest/join",
                    Period = "1m", // Limit to 10 requests per minute
                    Limit = 10
                }
            };
        });
        builder.Services.AddInMemoryRateLimiting();
        builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();



        builder.Services.AddAuthorization();
        builder.Services.AddSignalR();
        // Add services and repositories
        builder.Services.AddScoped<IAuthService, AuthService>();
        builder.Services.AddScoped<IStudentRepository, StudentRepository>();
        builder.Services.AddScoped<IProblemRepository, ProblemRepository>();
        builder.Services.AddScoped<ITestCaseRepository, TestCaseRepository>();
        builder.Services.AddScoped<IExecutionService, ExecutionService>();
        builder.Services.AddScoped<IUnifiedEvaluationService, UnifiedEvaluationService>();
        builder.Services.AddScoped<ISubmissionRepository, SubmissionRepository>();
        builder.Services.AddScoped<IContestRepository, ContestRepository>();


        builder.Services.AddHttpClient("Judge0", client =>
        {
            client.BaseAddress = new Uri(builder.Configuration["Judge0:BaseUrl"]);
            client.DefaultRequestHeaders.Add("Accept", "application/json");
        });

// .AddTransientHttpErrorPolicy(policyBuilder =>
//     policyBuilder.WaitAndRetryAsync(
//         3, // Number of retries
//         retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt))
//     )






        var app = builder.Build();
        // app.UseWebSockets();
        // app.Use(async (context, next) =>
        // {
        //     if (context.Request.IsHttps)
        //     {
        //         var socket = await context.WebSockets.AcceptWebSocketAsync();
        //         // Handle the socket connection
        //     }
        //     else
        //     {
        //         await next();
        //     }
        // });

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
        app.UseIpRateLimiting();
        app.MapHub<ContestHub>("/contestHub");

//         app.UseEndpoints(endpoints =>
// {
//     endpoints.MapHub<ContestHub>("/contestHub");
// });
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
