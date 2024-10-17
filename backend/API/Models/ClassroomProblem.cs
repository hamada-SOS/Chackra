using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ClassroomProblem
    {
        public int ClassroomID { get; set; } // Foreign Key
        public Classroom Classroom { get; set; }

        public int ProblemID { get; set; } // Foreign Key
        public Problem Problem { get; set; }

        public DateTime AssignedDate { get; set; }
    }

}