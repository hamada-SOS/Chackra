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

        [HttpGet("contestDetails/{id}")]
        public async Task<IActionResult> GetContestDetailsById(int id){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            var contestDetails = await _contestRepository.GetContestDetails(id);
            return Ok(contestDetails);

        }
    }
}