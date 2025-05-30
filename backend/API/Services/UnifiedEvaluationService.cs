using System.Text;
using API.Data;
using API.Dtos.Evalution;
using API.Dtos.Excution;
using API.Dtos.Problemea.Submission;
using API.Hubs;
using API.Interfaces.Evalution;
using API.Interfaces.Excution;
using API.Interfaces.Problema;
using API.Interfaces.Submissionn;
using API.Interfaces.testcase;
using API.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
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
        private readonly IHubContext<ContestHub> _hubContext;
        private readonly ApplicationDbContext _context;

        public UnifiedEvaluationService(
            IExecutionService executionService,
            IProblemRepository problemRepository,
            ITestCaseRepository testCaseRepository,
            ISubmissionRepository submissionRepository,
            ApplicationDbContext context,
            IHubContext<ContestHub> hubContext
            )
        {
            _executionService = executionService;
            _problemRepository = problemRepository;
            _testCaseRepository = testCaseRepository;
            _submissionRepository = submissionRepository;
            _hubContext = hubContext;
            _context = context;
        }

        // Evaluate and Save Submission
public async Task<SubmissionResultDto> EvaluateAndSaveSubmissionAsync(SubmissionRequestDto request)
{
    if (request.IsContestProblem)
    {
        // Validate if the submission is part of the contest
        var contest = await _context.Contests
            .Include(c => c.ContestProblems)
            .FirstOrDefaultAsync(c => c.Id == request.ContestId);
                // Fetch the TeamName from the Participant table
        var participant = await _context.Participants
            .FirstOrDefaultAsync(p => p.ContestId == request.ContestId && p.UserId == request.UserId);

        if (contest == null) throw new Exception("Contest not found.");
        if (!contest.ContestProblems.Any(cp => cp.ProblemId == request.ProblemID))
            throw new Exception("Problem not part of the contest.");

        // Ensure the contest is active
        // if (contest.Status != "InProgress")
        //     throw new Exception("Contest is not active.");

        // Retrieve test cases for the problem
        var CtestCases = await _testCaseRepository.GetTestCasesByProblemIdAsync(request.ProblemID);
        if (CtestCases == null || !CtestCases.Any())
            throw new Exception($"No test cases found for problem ID {request.ProblemID}.");

        var testCaseResults = new List<TestCaseResult>();
        bool CallPassed = true;
        int totalScore = 0;
        int maxScorePerTestCase = 100 / CtestCases.Count;

        foreach (var testCase in CtestCases)
        {
            var executionResult = await _executionService.ExecuteCodeAsync(
                request.SourceCode,
                testCase.Input,
                request.LanguageId
            );

            if (executionResult.StandardOutput == null)
            {
                var errorResult = new SubmissionResultDto
                {
                    PassedAllTestCases = false,
                    TestCaseResults = null,
                    error = executionResult.StandardError
                };
                return errorResult;
            }

            var passed = executionResult.StandardOutput.Trim() == testCase.ExpectedOutput.Trim();
            if (!passed) CallPassed = false;

            if (passed)
            {
                totalScore += maxScorePerTestCase;
            }

            testCaseResults.Add(new TestCaseResult
            {
                Input = testCase.Input,
                Output = executionResult.StandardOutput,
                ExpectedOutput = testCase.ExpectedOutput,
                Passed = passed
            });
        }

        // Save the submission details
        var Csubmission = new SubmissionEntity
        {
            ProblemID = request.ProblemID,
            ContestId = request.ContestId,
            UserId = request.UserId,
            Code = request.SourceCode,
            LanguageId = request.LanguageId,
            Passed = CallPassed,
            Score = totalScore,
            SubmissionTime = DateTime.UtcNow
        };
        await _submissionRepository.SaveSubmissionAsync(Csubmission);

        // Update the leaderboard
        var leaderboardEntry = await _context.Leaderboards
            .FirstOrDefaultAsync(l => l.ContestId == request.ContestId && l.UserId == request.UserId);

        if (leaderboardEntry == null)
        {
            leaderboardEntry = new Leaderboard
            {
                ContestId = request.ContestId,
                UserId = request.UserId,
                TotalScore = totalScore,
                LastSubmissionTime = DateTime.UtcNow,
                TeamName = participant.TeamName
            };
            _context.Leaderboards.Add(leaderboardEntry);
        }
        else
        {
            leaderboardEntry.TotalScore += totalScore;
            leaderboardEntry.LastSubmissionTime = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();

        // Fetch updated leaderboard data
        var leaderboardData = await _context.Leaderboards
            .Where(l => l.ContestId == request.ContestId)
            .OrderByDescending(l => l.TotalScore)
            .Select(l => new    
            {
                l.TeamName,
                l.TotalScore,
                l.LastSubmissionTime
            })
            .ToListAsync();

        // Broadcast leaderboard updates

        await _hubContext.Clients.Group($"Contest_{request.ContestId}")
            .SendAsync("BroadcastLeaderboardUpdate", leaderboardData);

        // Return the results
        return new SubmissionResultDto
        {
            PassedAllTestCases = CallPassed,
            TestCaseResults = testCaseResults,
            Score = totalScore,
            Team = participant.TeamName
        };
    }
    
        
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
                
                if (executionResult.StandardOutput == null){
                    var error = new SubmissionResultDto{
                        PassedAllTestCases = false,
                        TestCaseResults = null,
                        error = executionResult.StandardError
                    };
                    return error;
                }

                var passed = executionResult.StandardOutput.Trim() == testCase.ExpectedOutput.Trim();
                if (!passed) allPassed = false;

                results.Add(new TestCaseResult
                {
                    Input = testCase.Input,
                    Output = executionResult.StandardOutput,
                    ExpectedOutput = testCase.ExpectedOutput,
                    Passed = passed
                });
            }

            // Save submission
            var submission = new SubmissionEntity
            {
                ProblemID = request.ProblemID,
                Code = request.SourceCode,
                LanguageId = request.LanguageId,
                Passed = allPassed,

            };
            var submissionId = await _submissionRepository.SaveSubmissionAsync(submission);

            // Return results
            return new SubmissionResultDto
            {
                PassedAllTestCases = allPassed,
                TestCaseResults = results
            };
            
}

            // return resul

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
