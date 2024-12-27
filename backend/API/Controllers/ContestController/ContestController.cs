using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Contest;
using API.Interfaces.Contesttt;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ContestController
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContestController : ControllerBase
    {
        private readonly IContestRepository _contestRepository;

        public ContestController(IContestRepository contest)
        {
            _contestRepository = contest;
        }



        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateContest([FromBody] ContestDTO contestDTO)
        {
            try
                {
                    var result = await _contestRepository.CreateContest(contestDTO);
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
        }


        [HttpGet("GetContestCards")]
        public async Task<IActionResult> GetContestsCards(string id)
        {
            try
                {
                    var result = await _contestRepository.GetContestCards(id);
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
        }

        [HttpGet("contestDetails")]
        public async Task<IActionResult> GetContestDetailsById(int id){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            var contestDetails = await _contestRepository.GetContestDetails(id);
            return Ok(contestDetails);

        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinContest([FromBody] JoinContestDto joinContestDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _contestRepository.JoinContestAsync(joinContestDTO);
                return Ok("Successfully joined the contest.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add-problems")]
        public async Task<IActionResult> AddProblemsToContest([FromBody] AddProblemsToContestDTO dto)
        {
            try
            {
                await _contestRepository.AddProblemsToContest(dto);
                return Ok(new { message = "Problems added successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteContest([FromBody] DeleteContestDto edto)
    {
        try
        {
            await _contestRepository.DeleteAsync(edto);
            return NoContent(); // HTTP 204: Successful deletion, no content to return
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message }); // HTTP 404: Contest not found
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while processing your request.", details = ex.Message }); // HTTP 500: Internal Server Error
        }
    }

    [HttpDelete("deletecP")]
    public async Task<IActionResult> DeleteContestProblem([FromBody] DeleteContestProblem dto)
    {
        try
        {
            await _contestRepository.DeleteProblemFromContestAsync(dto);
            return NoContent(); // HTTP 204: Successful deletion, no content to return
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message }); // HTTP 404: Contest not found
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while processing your request.", details = ex.Message }); // HTTP 500: Internal Server Error
        }
    }

        [HttpGet("GetContestProblems")]
        public async Task<IActionResult> GetContestProblems(int contestId)
        {
            try
                {
                    var result = await _contestRepository.GetProblemsByContestIdAsync(contestId);
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = ex.Message });
                }
        }

    }
}