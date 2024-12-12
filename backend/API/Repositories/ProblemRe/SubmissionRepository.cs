using API.Models;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Interfaces.Submissionn;

namespace API.Repositories
{
    public class SubmissionRepository : ISubmissionRepository
    {
        private readonly ApplicationDbContext _context;

        public SubmissionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<SubmissionEntity> SaveSubmissionAsync(SubmissionEntity submissionEntity)
        {
            // Add the submission to the database
            
            _context.Submissions.Add(submissionEntity);

            // Save changes to persist the submission
            await _context.SaveChangesAsync();

            return submissionEntity;
        }

        public async Task<SubmissionEntity> GetSubmissionByIdAsync(int submissionId)
        {
            // Retrieve a specific submission by its ID
            return await _context.Submissions
                // .Include(s => s.TestCases) // Optionally include related entities
                .FirstOrDefaultAsync(s => s.SubmissionID == submissionId);
        }
    }
}
