using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Problemea.Submission;
using API.Interfaces.Evalution;
using API.Interfaces.Submission;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.SubmissionController

{
        [ApiController]
        [Route("api/[controller]")]
        public class SubmissionController : ControllerBase
        {
            private readonly IUnifiedEvaluationService _unifiedEvaluation;

            public SubmissionController(IUnifiedEvaluationService unifiedEvaluation)
            {
                _unifiedEvaluation = unifiedEvaluation;
            }

            [HttpPost]
            [Route("submit")]
            public async Task<IActionResult> SubmitCode([FromBody] SubmissionRequestDto request)
            {
                try
                {
                    var result = await _unifiedEvaluation.EvaluateAndSaveSubmissionAsync(request);
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
            }
        }

}