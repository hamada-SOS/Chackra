using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Contest
{
    public class AddProblemsToContestDTO
    {
        public int ContestId { get; set; }
        public List<int> ProblemIds { get; set; }
    }
}