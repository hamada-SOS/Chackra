using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Problem
    {
        public int ProblemID { get; set; } // Primary Key
        public string Title { get; set; } // VARCHAR(200)
        public string Description { get; set; } // TEXT
        public string DefualtCode{get; set;}
        public string Domain { get; set; }
        public string InputFormat { get; set; }
        public string Note { get; set; }
        public string Constraints { get; set; }
        public string Catagory {get; set;}
        public string Language{get; set;}
        public string Difficulty { get; set; } // VARCHAR(20)
        // Navigation Properties
        public ICollection<TestCase> TestCases { get; set; } // Collection of test cases for this problem
        public ICollection<Room_Problem> RoomProblems { get; set; }
        public ICollection<SubmissionEntity> Submissions { get; set; }
    }

}