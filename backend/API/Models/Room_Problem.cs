using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Room_Problem
    {
        public int RoomID { get; set; } // Foreign Key
        public CompetitiveRoom Room { get; set; }

        public int ProblemID { get; set; } // Foreign Key
        public Problem Problem { get; set; }

        public DateTime AssignedTime { get; set; }
    }

}