using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ContestProblem
{
    public int Id { get; set; }

    // Foreign keys
    public int ContestId { get; set; }
    public Contest Contest { get; set; }

    public int ProblemId { get; set; }
    public Problem Problem   { get; set; }

    public DateTime AssignedAt { get; set; }
}

}