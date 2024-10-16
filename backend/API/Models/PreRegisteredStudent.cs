using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class PreRegisteredStudent
    {
        public int Id { get; set; }
        public string? UniversityId { get; set; }
        public string? StudentName { get; set; }
        public string? Batch { get; set; }

    }
}