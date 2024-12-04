using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Evalution;
using API.Dtos.Excution;
using API.Dtos.Problemea.Submission;

namespace API.Interfaces.Evalution
{
    public interface IUnifiedEvaluationService
    {
        Task<SubmissionResultDto> EvaluateAndSaveSubmissionAsync(SubmissionRequestDto request);
        Task<EvaluationResultDto> EvaluateSubmissionAsync(int problemId, string sourceCode, int languageId);
        // Task<ExecutionResultDto> GetResultByTokenAsync(string token); 
        
        
        
           }
}