using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Contest;

namespace API.Mappers
{
    public static class ContestMapper
    {
        public static ContestDTO ToContestDto(this ContestDTO contestModel)
        {
            return new ContestDTO
            {
                Name = contestModel.Name,
                Description = contestModel.Description,
                StartTime = contestModel.StartTime,
                EndTime = contestModel.EndTime,
                IsActive = contestModel.IsActive,
                ParticipationType = contestModel.ParticipationType
            };
        }
    }
}