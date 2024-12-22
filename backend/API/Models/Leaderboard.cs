using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Leaderboard
    {
        public int Id { get; set; } // Primary Key

        // Foreign keys
        public int ContestId { get; set; }
        public Contest Contest { get; set; }

        public string UserId { get; set; } // For individual participants
        public ApplicationUser User { get; set; }

        public string TeamName { get; set; } // For team-based contests

        // Scoring and ranking
        public int TotalScore { get; set; }
        public int Rank { get; set; }

        // Timestamps
        public DateTime LastSubmissionTime { get; set; } // Used for tie-breaking
    }

}