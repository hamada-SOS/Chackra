using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

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
        
        // POST /api/judge/submit
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitCode([FromBody] Judge0SubmissionRequest model)
        {
            var client = _httpClientFactory.CreateClient();


            var url = "https://ce.judge0.com/submissions/?base64_encoded=true&wait=false";

            var payload = new 
            {
                source_code = model.SourceCode,
                language_id = model.LanguageId,
                stdin = model.StandardInput,
            };

            string jsonRequest = JsonConvert.SerializeObject(payload);

            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(url, content);

            if (!response.IsSuccessStatusCode)
            {
                // return BadRequest("faield mis");
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

            var response = await client.GetAsync($"https://ce.judge0.com/submissions/{token}?base64_encoded=false");

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());
            }

            var resultResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine(resultResponse);
            var result = JsonConvert.DeserializeObject<subm>(resultResponse);
            Console.WriteLine(result);


            return Ok(result);
        }
    }


public class Judge0SubmissionRequest
{
    [JsonProperty("source_code")]
    public string SourceCode { get; set; }

    [JsonProperty("language_id")]
    public int LanguageId { get; set; }

    [JsonProperty("stdin")]
    public string StandardInput { get; set; }

}
    public class Judge0Submission
    {
        public string? Token { get; set; }
    }


public class Judge0SubmissionResponse
{
    [JsonProperty("stdout")]
    public string? StandardOutput { get; set; }

    [JsonProperty("stderr")]
    public string? StandardError { get; set; }

    [JsonProperty("status_id")]
    public int StatusId { get; set; }

    [JsonProperty("time")]
    public string? Time { get; set; }

    [JsonProperty("memory")]
    public int? Memory { get; set; }
}


}
