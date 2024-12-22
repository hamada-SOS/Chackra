using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
public class Participant
{
    public int Id { get; set; }

    // Foreign keys
    public int ContestId { get; set; }
    public Contest Contest { get; set; }
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    public int Score { get; set; }

    public string TeamName { get; set; }
    public DateTime JoinedAt { get; set; }

}

}