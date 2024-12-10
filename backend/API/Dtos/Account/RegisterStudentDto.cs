using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Account
{
    public class RegisterStudentDto
    {
        public string UniversityId { get; set; }
        public string Password { get; set; }
        public string Email { get; set; } // Optional, but commonly needed for user registration
        public string Username { get; set; } // Optional, can store student name
    }
}