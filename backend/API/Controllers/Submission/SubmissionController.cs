using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Problemea.Submission;
using API.Interfaces.Submission;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.SubmissionController

{
        [ApiController]
        [Route("api/[controller]")]
        public class SubmissionController : ControllerBase
        {
            private readonly ISubmissionService _submissionService;

            public SubmissionController(ISubmissionService submissionService)
            {
                _submissionService = submissionService;
            }

            [HttpPost]
            [Route("submit")]
            public async Task<IActionResult> SubmitCode([FromBody] SubmissionRequestDto request)
            {
                try
                {
                    var result = await _submissionService.EvaluateSubmissionAsync(request);
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
            }
        }

}