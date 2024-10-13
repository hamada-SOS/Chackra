using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AuthResponeDto
    {
        public string Token { get; set; }
        public bool IsFirstLogin { get; set; }
    }
}