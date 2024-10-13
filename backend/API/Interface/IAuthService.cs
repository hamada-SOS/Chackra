using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;

namespace API.Interface
{
    public interface IAuthService
    {
        Task<AuthResponeDto> RegisterAsync(RegisterDto registerDto);
        Task<AuthResponeDto> LoginAsync(LoginDto loginDto);
        Task<bool> ChangePasswordAsync(ChangePasswordDto changePasswordDto);
    }


}