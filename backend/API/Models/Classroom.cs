using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Classroom
    {
        public int ClassroomID { get; set; } // Primary Key
        public string? ClassroomName { get; set; } // VARCHAR(100)
        public string? MentorID { get; set; } // Foreign Key (User)
        public DateTime CreationDate { get; set; }
        public string? ClassCode { get; set; } // VARCHAR(50)

        // Navigation Properties
        public ApplicationUser? Mentor { get; set; }
        public ICollection<Classroom_Student> ClassroomStudents { get; set; }
        public ICollection<ClassroomProblem> ClassroomProblems { get; set; }
    }

}