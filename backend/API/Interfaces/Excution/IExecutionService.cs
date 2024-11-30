using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Excution;

namespace API.Interfaces.Excution
{
    public interface IExecutionService
    {
        Task<ExecutionResultDto> ExecuteCodeAsync(string sourceCode, string stdin, int languageId);
        Task<ExecutionResultDto> GetResultByTokenAsync(string token);
    }
}