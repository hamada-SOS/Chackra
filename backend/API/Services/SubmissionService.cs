using API.Dtos.Problemea.Submission;
using API.Interfaces.Excution;
using API.Interfaces.Problema;
using API.Interfaces.Submission;
using API.Models;
using static API.Dtos.Problemea.Submission.SubmissionResultDto;

public class SubmissionService : ISubmissionService
{
    private readonly IProblemRepository _problemRepository;
    private readonly ITestCaseService _testCaseService;
    private readonly IExecutionService _executionService;
    private readonly ISubmissionRepository _submissionRepository;

    public SubmissionService(
        IProblemRepository problemRepository,
        ITestCaseService testCaseService,
        IExecutionService executionService,
        ISubmissionRepository submissionRepository)
    {
        _problemRepository = problemRepository;
        _testCaseService = testCaseService;
        _executionService = executionService;
        _submissionRepository = submissionRepository;
    }

    public async Task<SubmissionResultDto> EvaluateSubmissionAsync(SubmissionRequestDto request)
    {
        // 1. Validate problem existence
        var problem = await _problemRepository.GetProblemByIdAsync(request.ProblemId);
        if (problem == null)
            throw new ArgumentException("Invalid problem ID");

        // 2. Fetch test cases
        var testCases = await _testCaseService.GetTestCasesByProblemIdAsync(request.ProblemId);

        // 3. Evaluate code against each test case
        var results = new List<TestCaseResult>();
        bool allPassed = true;

        foreach (var testCase in testCases)
        {
            var executionResult = await _executionService.ExecuteCodeAsync(
                request.Code, 
                testCase.Input, 
                request.LanguageId
            );

            var passed = executionResult.Output == testCase.ExpectedOutput;
            if (!passed) allPassed = false;

            results.Add(new TestCaseResult
            {
                Input = testCase.Input,
                Output = executionResult.Output,
                ExpectedOutput = testCase.ExpectedOutput,
                Passed = passed
            });
        }

        // 4. Save submission
        var submission = new Submission
        {
            ProblemID = request.ProblemId,
            Code = request.Code,
            LanguageId = request.LanguageId,
            // Passed = allPassed
        };
        var submissionId = await _submissionRepository.SaveSubmissionAsync(submission);

        // 5. Return results
        return new SubmissionResultDto
        {
            SubmissionId = submissionId,
            PassedAllTestCases = allPassed,
            TestCaseResults = results
        };
    }
}
