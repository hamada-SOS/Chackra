using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Problemea.Submission
{
    public class SubmissionResultDto
    {
    public int SubmissionId { get; set; }
    public bool PassedAllTestCases { get; set; }
    public List<TestCaseResult> TestCaseResults { get; set;
    }


    public class TestCaseResult
    {
        public string Input { get; set; }
        public string Output { get; set; }
        public string ExpectedOutput { get; set; }
        public bool Passed { get; set; }
    }

}
    
}