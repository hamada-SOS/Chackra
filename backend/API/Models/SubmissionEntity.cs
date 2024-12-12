using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class SubmissionEntity
    {
        public int SubmissionID { get; set; } // Primary Key
        public string UserId { get; set; } // Foreign Key (User)
        public ApplicationUser User { get; set; }
        public int ContestId { get; set; }
        public Contest Contest { get; set; }
        public int ProblemID { get; set; } // Foreign Key
        public Problem Problem { get; set; }
        public string Token {get; set;}
        public DateTime SubmissionDate { get; set; }
        public string Code { get; set; } // TEXT
        public string Language { get; set; } // VARCHAR(20)
        public int LanguageId {get;set;}
        public string Result { get; set; } // VARCHAR(50)
        public bool Passed {get;set;}
        public decimal ExecutionTime { get; set; } // DECIMAL(5,2)
        public decimal MemoryUsed { get; set; } // DECIMAL(8,2)
        public int Points { get; set; }

    }

}