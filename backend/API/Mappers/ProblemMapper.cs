using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Problemea;
using API.Models;

namespace API.Mappers
{
    public static class ProblemMapper
    {
        public static ProblemDto ToProblemDto(this Problem problemModel)
        {
            return new ProblemDto
            {
                Id = problemModel.ProblemID,
                Title = problemModel.Title,
                Description = problemModel.Description,
                Domain = problemModel.Domain,
                InputFormat = problemModel.InputFormat,
                Note = problemModel.Note,
                SampleInput = problemModel.SampleInput,
                SampleOutput = problemModel.SampleOutput,
                Constraints = problemModel.Constraints,
                Catagory = problemModel.Catagory,
                Language = problemModel.Language,
                Difficulty = problemModel.Difficulty,
                DefualtCode = problemModel.DefualtCode,

            };
        }

        public static ProblemCard ToProblemCardDto(this ProblemCard problemModel)
        {
            return new ProblemCard
            {
                Id = problemModel.Id,
                Title = problemModel.Title,
                Diffculty = problemModel.Diffculty
            };
        }

        public static TestCaseDTO ToTestCaseDTO(this TestCase testCaseModel)
        {
            return new TestCaseDTO
            {
                TestCaseID = testCaseModel.TestCaseID,
                Input = testCaseModel.Input,
                ExpectedOutput = testCaseModel.ExpectedOutput
            };
        }

        public static ProblemDetail ToProblemDetailDto(this ProblemDetail problemModel)
        {
            return new ProblemDetail
            {
                ProblemID = problemModel.ProblemID,
                Title = problemModel.Title,
                DefualtCode = problemModel.DefualtCode,
                Description = problemModel.Description,
                SampleInput = problemModel.SampleInput,
                SampleOutput = problemModel.SampleOutput,
                InputFormat = problemModel.InputFormat,
                Note = problemModel.Note,
                Constraints = problemModel.Constraints,
                TestCases = problemModel.TestCases,
            };
        }
    }
}
