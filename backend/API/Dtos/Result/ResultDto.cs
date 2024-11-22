using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Result
{
    public class ResultDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProblemId { get; set; }
        public bool Passed { get; set; }
        public string SubmittedCode { get; set; }
        public double ExecutionTime { get; set; }
        public DateTime SubmissionTime { get; set; }
        public int TotalTestCases { get; set; }
        public int PassedTestCases { get; set; }
    }
}