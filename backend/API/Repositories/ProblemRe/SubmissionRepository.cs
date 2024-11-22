using API.Models;
using API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using API.Data;

namespace API.Repositories
{
    public class SubmissionRepository : ISubmissionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubmissionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Submission> SaveSubmissionAsync(Submission submission)
        {
            // Add the submission to the database
            _context.Submissions.Add(submission);

            // Save changes to persist the submission
            await _context.SaveChangesAsync();

            return submission;
        }

        public async Task<Submission?> GetSubmissionByIdAsync(Guid submissionId)
        {
            // Retrieve a specific submission by its ID
            return await _context.Submissions
                .Include(s => s.TestCases) // Optionally include related entities
                .FirstOrDefaultAsync(s => s.Id == submissionId);
        }
    }
}
