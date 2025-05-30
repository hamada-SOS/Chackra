using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Problemea.Submission
{
    public class Submiiision
    {
        public int SubmissionID { get; set; } // Primary Key
        public string StudentID { get; set; } // Foreign Key (User)
        public int ProblemID { get; set; } // Foreign Key
        public string Token {get; set;}
        public DateTime SubmissionDate { get; set; }
        public string Code { get; set; } // TEXT
        public string Language { get; set; } // VARCHAR(20)
        public int LanguageId {get;set;}
        public string Result { get; set; } // VARCHAR(50)
        public decimal ExecutionTime { get; set; } // DECIMAL(5,2)
        public decimal MemoryUsed { get; set; } // DECIMAL(8,2)
        public int Points { get; set; }
    }
        
    
}