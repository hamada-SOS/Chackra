using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Dtos.Account;
using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _context = context;
        }



        public async Task<IdentityResult> RegisterStudentAsync(RegisterStudentDto registerStudentDto)
        {
            var user = new ApplicationUser
            {
                UserName = registerStudentDto.Username,
                Email = registerStudentDto.Email,
            };
            // Create the user with the default password
            var result = await _userManager.CreateAsync(user, registerStudentDto.Password);

            // You can also assign roles if needed, e.g., student roles
            if (!result.Succeeded)
            {
                 throw new Exception("somting");
            }
            await _userManager.AddToRoleAsync(user, "Student");

            return result;
        }
        

public async Task<string> LoginAsync(LoginDto loginDto)
{
    if (loginDto == null) throw new ArgumentNullException(nameof(loginDto));
    if (string.IsNullOrEmpty(loginDto.Email) || string.IsNullOrEmpty(loginDto.Password))
        throw new ArgumentException("Email and password must be provided.");

    // Find user by email
    var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
    if (user == null)
    {
        // Log the failed attempt
        // _logger.LogWarning($"Login failed for email: {loginDto.Email}");
        throw new UnauthorizedAccessException("Email does not exist");
    }

    // Verify password
    var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
    if (!result.Succeeded)
    {
        // Log the failed attempt
        // _logger.LogWarning($"Invalid password attempt for user: {loginDto.Email}");
        throw new UnauthorizedAccessException("Invalid email or password");
    }

    // Generate JWT token
    return GenerateJwtToken(user);
}
        public async Task<bool> ChangePasswordAsync(ChangePasswordDto changePasswordDto, string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.NewPassword);

            if (result.Succeeded)
            {
                await _userManager.UpdateAsync(user);
            }

            return result.Succeeded;
        }

        public async Task<string> RefreshTokenAsync(RefreshTokenRequestDto refreshTokenRequest)
        {
            var principal = GetPrincipalFromExpiredToken(refreshTokenRequest.Token);
            if (principal == null) throw new SecurityTokenException("Invalid token");

            var userId = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null || user.RefreshToken != refreshTokenRequest.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                throw new SecurityTokenException("Invalid refresh token");
            }

            // Generate new JWT and refresh token
            var newJwtToken = GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            return newJwtToken;
        }

        private string GenerateRefreshToken()
        {
            var randomBytes = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }


        public string GenerateJwtToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]);

            // Define the claims that will be included in the JWT
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
        };

            // Set token expiration time, signing credentials, and other settings
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),  // Token valid for 1 Day
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["JwtSettings:Issuer"],
                Audience = _configuration["JwtSettings:Audience"]
            };

            // Create the JWT and return it as a string
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"])),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _configuration["JwtSettings:Issuer"],
                ValidAudience = _configuration["JwtSettings:Audience"],
                ValidateLifetime = false, // We allow expired tokens for refresh purposes
                ClockSkew = TimeSpan.Zero
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                // Validate the token and retrieve the principal (claims)
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

                var jwtSecurityToken = securityToken as JwtSecurityToken;
                if (jwtSecurityToken == null ||
                    !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new SecurityTokenException("Invalid token");
                }

                return principal;
            }
            catch
            {
                // If token validation fails, return null
                return null;
            }
        }

    }

}