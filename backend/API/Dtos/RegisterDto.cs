using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string? Id { get; set; } // Student ID

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        // Default password will be assigned
    }
}