using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos.Problemea;
using API.Interfaces.testcase;
using API.Mappers;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories.ProblemRe
{
    public class TestCaseRepository : ITestCaseRepository
    {
        private readonly ApplicationDbContext _context;
        public TestCaseRepository(ApplicationDbContext applicationDbContext)
    
        {
            _context = applicationDbContext;
        }

        public async Task<List<TestCase>> GetALlTestCasesAsync()
        {
            var testcases = await _context.TestCases.Select(tc => new TestCase{
                TestCaseID = tc.TestCaseID,
                Input = tc.Input,
                ExpectedOutput = tc.ExpectedOutput

            }).ToListAsync();
            return testcases;
        }

        public async Task<List<TestCase>> GetTestCasesById(int? id)
        {

            if (id == null){
                return null;
            }
            var testById = await _context.TestCases.Where(tc => tc.ProblemID == id)
            .Select(tc => new TestCase{
                TestCaseID = tc.TestCaseID,
                ProblemID = tc.ProblemID,
                Input = tc.Input,
                ExpectedOutput = tc.ExpectedOutput
            }).ToListAsync();

            return testById;
        }

 public async Task<List<TestCase>> GetTestCasesByProblemIdAsync(int problemId)
        {
            return await _context.TestCases
                .Where(tc => tc.ProblemID == problemId)
                .ToListAsync();
        }
    }
}