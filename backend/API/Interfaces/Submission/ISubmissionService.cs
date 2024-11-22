using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Problemea.Submission;

namespace API.Interfaces.Submission
{
    public interface ISubmissionService
    {
        Task<SubmissionResultDto> EvaluateSubmissionAsync(SubmissionRequestDto request);
    }
}