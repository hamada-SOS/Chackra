using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Account;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.AuthController
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

        // Registration endpoint for students
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterStudentDto registerStudentDto)
        {
            var result = await _authService.RegisterStudentAsync(registerStudentDto);
            if (result.Succeeded)
            {
                return Ok("Student registered successfully.");
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                var token = await _authService.LoginAsync(loginDto);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Other endpoints (ChangePassword, RefreshToken) go here...
    }

}