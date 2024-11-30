using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces.testcase;
using API.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.ProblemController
{
    public class TestCaseController: ControllerBase
    {
        private readonly ITestCaseRepository _testCases;

        public TestCaseController(ITestCaseRepository testCases)
        {
            _testCases = testCases;
        }

         [HttpGet("AllTestCases")]
        public async Task<IActionResult> GetAllTestCases(){
                // Console.WriteLine($"Received Catagory: {Catagory}"); // For debugging
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            var TestCases = await _testCases.GetALlTestCasesAsync();
            var TestCasesDto = TestCases.Select(tc => tc.ToTestCaseDTO());
            return Ok(TestCasesDto);

        }

        [HttpGet("TestCyId{id}")]
        public async Task<IActionResult> GetTestCasesById(int id){
                // Console.WriteLine($"Received Catagory: {Catagory}"); // For debugging
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            
            var TestCases = await _testCases.GetTestCasesById(id);
            var TestCasesDto = TestCases.Select(tc => tc.ToTestCaseDTO());
            return Ok(TestCasesDto);

        }

    }
}