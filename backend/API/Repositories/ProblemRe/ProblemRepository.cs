using System.Net.Sockets;
using API.Data;
using API.Dtos.Problemea;
using API.Helpers;
using API.Interfaces.Problema;
using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories.ProblemRe
{
    public class ProblemRepository : IProblemRepository
    {
        private readonly ApplicationDbContext _context;

        public ProblemRepository(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        public async Task<List<ProblemCard>> GetProblemCardsAsync(string Catagory)
        {
            var problemCards = await _context.Problems
                .Where(p => p.Catagory == Catagory)
                .Select(p => new ProblemCard
                {
                    Id = p.ProblemID,
                    Title = p.Title,
                    Diffculty = p.Difficulty
                })
                .ToListAsync();

            return problemCards;
        }

        public async Task<ProblemDetail> GetProblemDetails(int id)
        {
            var problemDetails = await _context.Problems
                // .Include(p => p.TestCases) // Ensures TestCases are loaded
                .Where(p => p.ProblemID == id).Include(p => p.TestCases)
                .Select(p => new ProblemDetail
                {
                    ProblemID = p.ProblemID,
                    Title = p.Title,
                    Description = p.Description,
                    InputFormat = p.InputFormat,
                    Constraints = p.Constraints,
                    DefualtCode = p.DefualtCode,
                    Note = p.Note,
                    TestCases = p.TestCases.Where(tc => tc.ProblemID == id).ToList()
                })
                .FirstOrDefaultAsync();

            return problemDetails;
        }

        public async Task<List<Problem>> GetProblemsByCatagoryAsync(string Catagory)
        {
            var problems = await _context.Problems
                .Where(p => p.Catagory == Catagory)
                .ToListAsync();

            return problems;
        }
    }
}
