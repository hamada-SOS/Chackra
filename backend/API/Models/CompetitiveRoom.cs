using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class CompetitiveRoom
    {
        public int RoomID { get; set; } // Primary Key
        public string? RoomName { get; set; } // VARCHAR(100)
        public string HostID { get; set; } // Foreign Key (User)
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? RoomCode { get; set; } // VARCHAR(50)

        // Navigation Properties
        public ApplicationUser? Host { get; set; }
        public ICollection<Room_Problem> RoomProblems { get; set; }
    }

}