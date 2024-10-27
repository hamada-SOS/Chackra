using API.Data;
using API.Dtos.Problemea;
using API.Helpers;
using API.Interfaces.Problema;
using API.Models;
using Microsoft.EntityFrameworkCore;

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
            var ProblemCard = await _context.Problems
            .Where(p => p.Catagory == Catagory)
            .Select(p => new ProblemCard{
                Id = p.ProblemID,
                Title = p.Title,
                Diffculty = p.Difficulty
            })
            .ToListAsync();

            return ProblemCard;
        }

        public async Task<ProblemDetail> GetProblemDetails(int ProblemID)
        {
            var probemDetails = await _context.Problems
            .Where(p => p.ProblemID == ProblemID)
            .Select(p => new ProblemDetail{
                Title = p.Title,
                Description = p.Description,
                InputFormat = p.InputFormat,
                Constraints = p.Constraints,
                SampleInput = p.SampleInput,
                SampleOutput = p.SampleOutput,
                Language = p.Language,
            })

            .FirstOrDefaultAsync();
            return probemDetails;
        }

        public async Task<List<Problem>> GetProblemsByCatagoryAsync(string Catagory)
        {
            var problems = await _context.Problems.AsQueryable().Where(p => p.Catagory == Catagory).ToListAsync();
            if (problems == null){
                return null;
            }
            return problems;
        }
    }
}