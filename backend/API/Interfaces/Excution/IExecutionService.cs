using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Excution;
using static ExecutionService;

namespace API.Interfaces.Excution
{
    public interface IExecutionService
    {
        Task<InsideExecutionResultDto> ExecuteCodeAsync(string sourceCode, string stdin, int languageId);
        // Task<ExecutionResultDto> GetResultByTokenAsync(string token);
    }
}