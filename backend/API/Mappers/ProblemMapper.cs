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
                Title = problemModel.Title,
                Description = problemModel.Description,
                Domain = problemModel.Domain,
                InputFormat = problemModel.InputFormat,
                Note = problemModel.Note, 
                Constraints = problemModel.Constraints,
                Catagory = problemModel.Catagory,
                Language = problemModel.Language,
                Difficulty = problemModel.Difficulty,
                SampleInput = problemModel.SampleInput,
                SampleOutput = problemModel.SampleOutput
            };

        }

    }
}