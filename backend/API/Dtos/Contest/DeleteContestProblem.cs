using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Contest
{
    public class DeleteContestProblem
    {

    [Required]
    public int ContestId { get; set; }
    [Required]
    public int ProblemId { get; set; }
    }
}