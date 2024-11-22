using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces.testcase
{
    public interface ITestCaseRepository
    {
        Task <List<TestCase>> GetALlTestCasesAsync();
        Task<List<TestCase>> GetTestCasesById(int? id);
        Task<List<TestCase>> GetTestCasesByProblemIdAsync(int problemId);
    }
}