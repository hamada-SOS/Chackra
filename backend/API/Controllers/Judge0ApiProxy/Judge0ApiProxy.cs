using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Judge0ApiProxy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JudgeController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public JudgeController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        private const string Judge0ApiUrl = "https://api.judge0.com";
        
        // POST /api/judge/submit
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitCode([FromBody] CodeSubmission model)
        {
            var client = _httpClientFactory.CreateClient();

            var submissionRequest = new
            {
                source_code = model.sourceCode,
                language_id = model.languageId,
                stdin = model.stdin,
                expected_output = model.expectedOutput
            };


            var content = new StringContent(JsonConvert.SerializeObject(submissionRequest), Encoding.UTF8, "application/json");

            var response = await client.PostAsync($"{Judge0ApiUrl}/submissions/?base64_encoded=false&wait=false", content);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var submissionResponse = await response.Content.ReadAsStringAsync();
            var submission = JsonConvert.DeserializeObject<Judge0Submission>(submissionResponse);

            return Ok(submission);
        }

        // GET /api/judge/result/{token}
        [HttpGet("result/{token}")]
        public async Task<IActionResult> GetSubmissionResult(string token)
        {
            var client = _httpClientFactory.CreateClient();

            var response = await client.GetAsync($"{Judge0ApiUrl}/submissions/{token}?base64_encoded=false");

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var resultResponse = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<Judge0Result>(resultResponse);

            return Ok(result);
        }
    }

    public class CodeSubmission
    {
        public string sourceCode { get; set; }
        public int languageId { get; set; }
        public string stdin { get; set; }
        public string expectedOutput { get; set; }
    }

    public class Judge0Submission
    {
        public string Token { get; set; }
    }

    public class Judge0Result
{
    public string stdout { get; set; }       // Standard output from the code execution
    public string stderr { get; set; }       // Standard error from the code execution
    public int exit_code { get; set; }       // Exit code of the executed program
    public string message { get; set; }      // Any additional messages (error or status)
    public bool timed_out { get; set; }      // If the execution timed out
    public bool memory_limit_exceeded { get; set; }  // If memory limit was exceeded
    public bool cpu_time_limit_exceeded { get; set; } // If CPU time exceeded limit
    public int time { get; set; }            // Time taken for execution
    public int memory { get; set; }          // Memory used during execution
}


}
