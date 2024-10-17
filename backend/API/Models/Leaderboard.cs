using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Leaderboard
    {
        public int LeaderboardID { get; set; } // Primary Key
        public string? StudentID { get; set; } // Foreign Key (User)
        public ApplicationUser Student { get; set; }

        public int ProblemID { get; set; } // Foreign Key
        public Problem Problem { get; set; }

        public int Points { get; set; }
        public int Ranking { get; set; }
    }

}