
namespace API.Dtos.Evalution
{
        public class EvaluationResultDto
    {
        public int ProblemId { get; set; }
        public List<TestCaseResultDto> TestCaseResults { get; set; }
        public bool AllPassed { get; set; }
    }

    }