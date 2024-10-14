using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interface;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Repository
{
    public class AuthRepository : IAuthRepository
    {

        private readonly UserManager<ApplicationUser> _userManager;

        public AuthRepository(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }





        public async Task<ApplicationUser> RegisterAsync(string id, string email, string password)
        {
            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                Id = id,
                IsFirstLogin = true
            };


            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded)
            {
                return user;
            }

            // Handle errors as needed (e.g., log them)
            return null;

        }



        public async Task<ApplicationUser> GetUsersByIdAsync(string id)
        {
            if (id.IsNullOrEmpty())
            {
                return null;
            }

            return await _userManager.FindByIdAsync(id);
        }

        public async Task<ApplicationUser> GetUsersByEmailAsync(string email)
        {
            if (email.IsNullOrEmpty())
            {
                return null;
            }

            return await _userManager.FindByIdAsync(email);
        }
        public async Task<bool> CheckPasswordAsync(ApplicationUser user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<bool> UpdatePasswordAsync(ApplicationUser user, string newPassword)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
            if (result.Succeeded)
            {
                user.IsFirstLogin = false;
                await _userManager.UpdateAsync(user);
                return true;
            }
            return false;

        }
    }
}