using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
public class Contest
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsActive { get; set; }
    public string ParticipationType{get;set;}

    // Foreign key
    public string HostId { get; set; }
    public ApplicationUser Host { get; set; }

    // Navigation properties
    public ICollection<ContestProblem> ContestProblems { get; set; }
    public ICollection<Participant> Participants { get; set; }
    public ICollection<SubmissionEntity> Submissions { get; set; }

}

}

