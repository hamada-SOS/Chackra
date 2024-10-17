using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class PreRegisteredTeacher
    {

        public int Id { get; set; }
        public string? UniversityId { get; set; }
        public string? TeacherName { get; set; }
    }
}