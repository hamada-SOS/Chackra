using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Excution;

namespace API.Services
{
public class ExecutionService : IExecutionService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public ExecutionService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<ExecutionResultDto> ExecuteCodeAsync(string sourceCode, string stdin, int languageId)
    {
        // Build the request payload
        var payload = new ExecutionRequestDto
        {
            SourceCode = sourceCode,
            Stdin = stdin,
            LanguageId = languageId
        };

        var jsonContent = new StringContent(
            JsonSerializer.Serialize(payload), 
            Encoding.UTF8, 
            "application/json"
        );

        // Send the request to Judge0 API
        var response = await _httpClient.PostAsync(
            _configuration["Judge0:Endpoint"], 
            jsonContent
        );

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception("Execution engine error: " + response.ReasonPhrase);
        }

        // Parse the response
        var responseContent = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<ExecutionResultDto>(responseContent);

        return result ?? throw new Exception("Invalid response from execution engine.");
    }
}

}