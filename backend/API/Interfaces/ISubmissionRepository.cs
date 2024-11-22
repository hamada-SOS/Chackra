using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ISubmissionRepository
    {
        Task<Submission> SaveSubmissionAsync(Submission submission);
        Task<Submission?> GetSubmissionByIdAsync(Guid submissionId);
    }
}