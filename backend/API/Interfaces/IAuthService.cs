using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Account;
using Microsoft.AspNetCore.Identity;

namespace API.Interfaces
{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginDto loginDto);
        Task<bool> ChangePasswordAsync(ChangePasswordDto changePasswordDto, string userId);
        Task<string> RefreshTokenAsync(RefreshTokenRequestDto refreshTokenRequest);
        Task<IdentityResult> RegisterStudentAsync(RegisterStudentDto registerStudentDto); // Added registration method

    }


}