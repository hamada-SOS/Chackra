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

    public async Task<InsideExecutionResultDto> ExecuteCodeAsync(string sourceCode, string stdin, int languageId)
    {
        var client = _httpClientFactory.CreateClient("Judge0");

        // var submissionsEndpoint = _configuration["Judge0:SubmissionsEndpoint"];
        // var url = $"{client.BaseAddress}{submissionsEndpoint}";
        
        var url = "http://localhost:2358/submissions/?base64_encoded=false&wait=true";


        var payload = new ExecutionRequestDto
        {
            SourceCode = sourceCode,
            StandardInput = stdin,
            LanguageId = languageId
        };

        string jsonRequest = JsonConvert.SerializeObject(payload);
        var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
        var response = await client.PostAsync(url, content);
        // Console.WriteLine(response);

        if (!response.IsSuccessStatusCode)
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            throw new Exception($"Execution engine error: {response.ReasonPhrase}. Details: {errorContent}");
        }

        var submissionResponse = await response.Content.ReadAsStringAsync();
        Console.WriteLine(submissionResponse);
        var submission = JsonConvert.DeserializeObject<Judge0SubmissionSOS>(submissionResponse);
        var token = submission.Token;
        Console.WriteLine(submission.Token);
        // return submission ?? throw new Exception("Invalid response from execution engine.");

        // var resultEndpoint = _configuration["Judge0:ResultEndpoint"];
        // var urll = $"{client.BaseAddress}{submission.Token}{resultEndpoint}";
        var responsee = await client.GetAsync($"http://localhost:2358/submissions/{token}?base64_encoded=false&wait=true"
        );


        // var responsee = await client.GetAsync(urll);
        Console.WriteLine(responsee.Content);

        if (!responsee.IsSuccessStatusCode)
        {
            var errorContent = await responsee.Content.ReadAsStringAsync();
            throw new Exception($"Failed to fetch execution result: {responsee.ReasonPhrase}. Details: {errorContent}");
        }

        var resultResponse = await responsee.Content.ReadAsStringAsync();
        // Console.WriteLine(resultResponse);
        var executionResult = JsonConvert.DeserializeObject<InsideExecutionResultDto>(resultResponse);
        // Console.WriteLine(executionResult);
        return executionResult ?? throw new Exception("Invalid response from execution engine.");
    }
    }




    public class Judge0SubmissionSOS
    {
        public string Token { get; set; }
    }




public class InsideExecutionResultDto
    {
    [JsonProperty("stdout")]
    public string StandardOutput { get; set; }

    [JsonProperty("stderr")]
    public string StandardError { get; set; }

    [JsonProperty("status_id")]
    public int StatusId { get; set; }

    [JsonProperty("time")]
    public string Time { get; set; }

    
}


    // public async Task<ExecutionResultDto> GetResultByTokenAsync(string token)
    // {
    //     var client = _httpClientFactory.CreateClient("Judge0");

    //     var resultEndpoint = _configuration["Judge0:ResultEndpoint"];
    //     var url = $"{client.BaseAddress}{resultEndpoint}/{token}";

    //     var response = await client.GetAsync(url);

    //     if (!response.IsSuccessStatusCode)
    //     {
    //         var errorContent = await response.Content.ReadAsStringAsync();
    //         throw new Exception($"Failed to fetch execution result: {response.ReasonPhrase}. Details: {errorContent}");
    //     }

    //     var resultResponse = await response.Content.ReadAsStringAsync();
    //     var executionResult = JsonConvert.DeserializeObject<ExecutionResultDto>(resultResponse);

    //     return executionResult ?? throw new Exception("Invalid response from execution engine.");
    // }
