using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interface
{
    public interface IAuthRepository
    {
        Task<ApplicationUser> RegisterAsync(string? id, string? email, string? password);
        Task<ApplicationUser> GetUsersByIdAsync(string? id);
        Task<ApplicationUser> GetUsersByEmailAsync(string? email);
        Task<bool> CheckPasswordAsync(ApplicationUser user, string? password);
        Task<bool> UpdatePasswordAsync(ApplicationUser user, string? newPassword);
    }
}