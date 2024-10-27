using API.Helpers;
using API.Interfaces.Problema;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ProblemController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemController : ControllerBase
    {
        private readonly IProblemRepository _problemrepo;

        public ProblemController(IProblemRepository problemRepository)
        {
            _problemrepo = problemRepository;
        }
        [HttpGet("problmesByCatagory")]
        public async Task<IActionResult> GetProblmeByCatagory([FromQuery] string Catagory){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            var problems = await _problemrepo.GetProblemsByCatagoryAsync(Catagory);
            var problemdto = problems.Select(s => s.ToProblemDto());
            return Ok(problemdto);

        }


        [HttpGet("problmesCardsByCatagory")]
        public async Task<IActionResult> GetProblmeCardByCatagory([FromQuery] string Catagory){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            var problemsCard = await _problemrepo.GetProblemCardsAsync(Catagory);
            var problemCardDto = problemsCard.Select(p => p.ToProblemCardDto());
            return Ok(problemCardDto);

        }

        [HttpGet("problmesByID/{id}")]
        public async Task<IActionResult> GetProblmeDetailsById(int id){

            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            var problemsDetails = await _problemrepo.GetProblemDetails(id);
            var problemDetailDto = problemsDetails.ToProblemDetailDto();
            return Ok(problemDetailDto);

        }
        


    }
}