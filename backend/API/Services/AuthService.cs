using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Dtos;
using API.Interface;
using API.Models;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }




        public async Task<AuthResponeDto> RegisterAsync(RegisterDto registerDto)
        {
            string defaultPassword = "FOC@123";

            var user = await _authRepository.RegisterAsync(registerDto.Id, registerDto.Email, defaultPassword);
            if (user == null)
            {
                Console.WriteLine("this error from authservice");

                return null;
            }

            var token = GenerateJwtToken(user);

            return new AuthResponeDto
            {
                Token = token,
                IsFirstLogin = user.IsFirstLogin
            };

        }




        public async Task<AuthResponeDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _authRepository.GetUsersByIdAsync(loginDto.Id);
            if (user == null)
            {
                //UserNotFOund
                return null;
            }

            bool isPasswordValid = await _authRepository.CheckPasswordAsync(user, loginDto.Password);

            if (!isPasswordValid)
            {
                //Password is not correct //TODO
                return null;
            }

            var token = GenerateJwtToken(user);

            return new AuthResponeDto
            {
                Token = token,
                IsFirstLogin = user.IsFirstLogin
            };

        }

        public async Task<bool> ChangePasswordAsync(ChangePasswordDto changePasswordDto)
        {
            var user = await _authRepository.GetUsersByIdAsync(changePasswordDto.Id);
            if (user == null)
            {
                // User not found
                return false;
            }

            if (!user.IsFirstLogin)
            {
                // Not first login; password change not allowed through this method
                return false;
            }

            bool result = await _authRepository.UpdatePasswordAsync(user, changePasswordDto.NewPassword);
            return result;
        }


        private string GenerateJwtToken(ApplicationUser user)
        {

            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["Secret"];
            var issuer = jwtSettings["Issuer"];
            var Audience = jwtSettings["Audience"];
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);


            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("IsFirstLogin", user.IsFirstLogin.ToString())

                //Add adtional Claims if needed

            };


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = credentials,
                Issuer = issuer,
                Audience = Audience,

            };


            // var token = new JwtSecurityToken(
            //     issuer,
            //     Audience,
            //     claims,
            //     expires: DateTime.Now.AddMinutes(expirationMinutes),
            //     signingCredentials: credentials
            // );

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);





        }

    }
}