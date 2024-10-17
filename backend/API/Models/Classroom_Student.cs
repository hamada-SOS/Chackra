using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Classroom_Student
    {
        public int ClassroomID { get; set; } // Foreign Key
        public Classroom Classroom { get; set; }

        public string StudentID { get; set; } // Foreign Key (User)
        public ApplicationUser Student { get; set; }
    }

}