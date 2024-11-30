using System.Text;
using API.Dtos.Excution;
using API.Interfaces.Excution;
using Newtonsoft.Json;

public class ExecutionService : IExecutionService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;




    public ExecutionService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }





    public async Task<ExecutionResultDto> ExecuteCodeAsync(string sourceCode, string stdin, int languageId)
    {
        var client = _httpClientFactory.CreateClient("Judge0");

        var submissionsEndpoint = _configuration["Judge0:SubmissionsEndpoint"];
        var url = $"{client.BaseAddress}{submissionsEndpoint}";

        var payload = new ExecutionRequestDto
        {
            SourceCode = sourceCode,
            Stdin = stdin,
            LanguageId = languageId
        };

        string jsonRequest = JsonConvert.SerializeObject(payload);
        var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
        var response = await client.PostAsync(url, content);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Execution engine error: {response.ReasonPhrase}. Details: {errorContent}");
        }

        var submissionResponse = await response.Content.ReadAsStringAsync();
        var submission = JsonConvert.DeserializeObject<ExecutionResultDto>(submissionResponse);

        return submission ?? throw new Exception("Invalid response from execution engine.");
    }











    public async Task<ExecutionResultDto> GetResultByTokenAsync(string token)
    {
        var client = _httpClientFactory.CreateClient("Judge0");

        var resultEndpoint = _configuration["Judge0:ResultEndpoint"];
        var url = $"{client.BaseAddress}{resultEndpoint}/{token}";

        var response = await client.GetAsync(url);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Failed to fetch execution result: {response.ReasonPhrase}. Details: {errorContent}");
        }

        var resultResponse = await response.Content.ReadAsStringAsync();
        var executionResult = JsonConvert.DeserializeObject<ExecutionResultDto>(resultResponse);

        return executionResult ?? throw new Exception("Invalid response from execution engine.");
    }
}
