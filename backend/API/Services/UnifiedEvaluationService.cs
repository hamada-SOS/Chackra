using System.Text;
using API.Dtos.Evalution;
using API.Dtos.Excution;
using API.Dtos.Problemea.Submission;
using API.Interfaces.Evalution;
using API.Interfaces.Excution;
using API.Interfaces.Problema;
using API.Interfaces.Submissionn;
using API.Interfaces.testcase;
using API.Models;
using Newtonsoft.Json;
using static API.Dtos.Problemea.Submission.SubmissionResultDto;

namespace API.Services
{
    public class UnifiedEvaluationService : IUnifiedEvaluationService
    {
        private readonly IExecutionService _executionService;
        private readonly IProblemRepository _problemRepository;
        private readonly ITestCaseRepository _testCaseRepository;
        private readonly ISubmissionRepository _submissionRepository;

        public UnifiedEvaluationService(
            IExecutionService executionService,
            IProblemRepository problemRepository,
            ITestCaseRepository testCaseRepository,
            ISubmissionRepository submissionRepository)
        {
            _executionService = executionService;
            _problemRepository = problemRepository;
            _testCaseRepository = testCaseRepository;
            _submissionRepository = submissionRepository;
        }

        // Evaluate and Save Submission
        public async Task<SubmissionResultDto> EvaluateAndSaveSubmissionAsync(SubmissionRequestDto request)
        {
            // Validate problem existence
            var problem = await _problemRepository.GetProblemDetails(request.ProblemID);
            if (problem == null)
                throw new ArgumentException("Invalid problem ID");

            // Fetch test cases
            var testCases = await _testCaseRepository.GetTestCasesByProblemIdAsync(request.ProblemID);
            if (testCases == null || !testCases.Any())
                throw new Exception($"No test cases found for problem ID {request.ProblemID}.");
            

            // Evaluate code against each test case
            var results = new List<TestCaseResult>();
            bool allPassed = true;

            foreach (var testCase in testCases)
            {

                var executionResult = await _executionService.ExecuteCodeAsync(
                    request.SourceCode,
                    testCase.Input,
                    request.LanguageId
                );
                
                

                var passed = executionResult.StandardOutput.Trim() == testCase.ExpectedOutput.Trim();
                Console.WriteLine(executionResult.StandardOutput.Trim(),testCase.ExpectedOutput.Trim());
                if (!passed) allPassed = false;

                results.Add(new TestCaseResult
                {
                    Input = testCase.Input,
                    Output = executionResult.StandardOutput,
                    ExpectedOutput = testCase.ExpectedOutput,
                    Passed = passed
                });

                Console.WriteLine(results);
            }

            // Save submission
            var submission = new SubmissionEntity
            {
                ProblemID = request.ProblemID,
                Code = request.SourceCode,
                LanguageId = request.LanguageId,
                Passed = allPassed
            };
            var submissionId = await _submissionRepository.SaveSubmissionAsync(submission);

            // Return results
            return new SubmissionResultDto
            {
                PassedAllTestCases = allPassed,
                TestCaseResults = results
            };


            // return results;
            
        }

        // Fetch Results by Token
        // public async Task<ExecutionResultDto> GetResultByTokenAsync(string token)
        // {
        //     return await _executionService.GetResultByTokenAsync(token);
        // }

        // Direct Evaluation Without Saving
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
                // bool isPassed = executionResult.StandardOutput.Trim() == testCase.ExpectedOutput.Trim();

                evaluationResults.Add(new TestCaseResultDto
                {
                    Input = testCase.Input,
                    ExpectedOutput = testCase.ExpectedOutput,
                    // ActualOutput = executionResult.StandardOutput,
                    // Passed = isPassed
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
