using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Problemea.Submission;
using API.Models;

namespace API.Interfaces.Submissionn
{
    public interface ISubmissionRepository
    {
        Task<SubmissionEntity> SaveSubmissionAsync(SubmissionEntity submission);
        Task<SubmissionEntity> GetSubmissionByIdAsync(int submissionId);
    }
}
