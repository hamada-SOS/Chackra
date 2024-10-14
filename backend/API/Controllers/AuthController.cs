// Controllers/AuthController.cs
using System.Threading.Tasks;
using API.Dtos;
using API.Interface;
using Microsoft.AspNetCore.Mvc;

namespace AuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST: api/Auth/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)

                return BadRequest("modelState is not valid");

            var authResponse = await _authService.RegisterAsync(registerDto);
            if (authResponse == null)
                return BadRequest("Registration failed.");

            return Ok(authResponse);
        }

        // POST: api/Auth/Login
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var authResponse = await _authService.LoginAsync(loginDto);
            if (authResponse == null)
                return Unauthorized("Invalid credentials.");

            return Ok(authResponse);
        }

        // POST: api/Auth/ChangePassword
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.ChangePasswordAsync(changePasswordDto);
            if (!result)
                return BadRequest("Password change failed.");

            return Ok("Password changed successfully.");
        }
    }
}
