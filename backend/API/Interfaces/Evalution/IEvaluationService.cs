using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Evalution;

namespace API.Interfaces.Evalution
{
    public interface IEvaluationService
    {
        Task<EvaluationResultDto> EvaluateSubmissionAsync(int problemId, string sourceCode, int languageId);
    }
}