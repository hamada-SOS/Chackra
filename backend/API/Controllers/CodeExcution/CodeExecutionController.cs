using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;
using System.Text.Json;

[ApiController]
[Route("api/[controller]")]
public class CodeExecutionController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public CodeExecutionController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpPost("execute")]
    public async Task<IActionResult> ExecuteCode([FromBody] CodeExecutionRequest request)
    {
        var judge0Request = new
        {
            source_code = request.Code,
            language_id = request.LanguageId, // You can map language names to Judg0 language IDs
            stdin = request.Input
        };

        var response = await _httpClient.PostAsJsonAsync("http://localhost:2358/submissions?base64_encoded=false&wait=true", judge0Request);
        var result = await response.Content.ReadFromJsonAsync<JsonDocument>();

        return Ok(result);
    }
}

public class CodeExecutionRequest
{
    public string Code { get; set; }
    public int LanguageId { get; set; }
    public string Input { get; set; }
}
