using API.Data;
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