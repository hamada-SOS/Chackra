
using API.Dtos.Evalution;
using API.Interfaces.Evalution;
using API.Interfaces.Excution;
using API.Interfaces.testcase;

namespace API.Services
{
    public class EvaluationService : IEvaluationService
    {
        private readonly IExecutionService _executionService;
        private readonly ITestCaseRepository _testCaseRepository;

        public EvaluationService(IExecutionService executionService, ITestCaseRepository testCaseRepository)
        {
            _executionService = executionService;
            _testCaseRepository = testCaseRepository;
        }

        public async Task<EvaluationResultDto> EvaluateSubmissionAsync(int problemId, string sourceCode, int languageId)
        {
            // Fetch test cases from the repository
            var testCases = await _testCaseRepository.GetTestCasesByProblemIdAsync(problemId);
            if (testCases == null || !testCases.Any())
                throw new Exception($"No test cases found for problem ID {problemId}.");

            var evaluationResults = new List<TestCaseResultDto>();

            foreach (var testCase in testCases)
            {
                // Execute the code for the given test case
                var executionResult = await _executionService.ExecuteCodeAsync(
                    sourceCode, testCase.Input, languageId
                );

                // Compare actual output with expected output
                bool isPassed = executionResult.Stdout.Trim() == testCase.ExpectedOutput.Trim();

                evaluationResults.Add(new TestCaseResultDto
                {
                    Input = testCase.Input,
                    ExpectedOutput = testCase.ExpectedOutput,
                    ActualOutput = executionResult.Stdout,
                    Passed = isPassed
                });
            }

            return new EvaluationResultDto
            {
                ProblemId = problemId,
                TestCaseResults = evaluationResults,
                AllPassed = evaluationResults.All(r => r.Passed)
            };
        }
    }
}
