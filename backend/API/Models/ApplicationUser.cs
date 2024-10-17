using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? UniversityId { get; set; }
        public string? batch { get; set; }
        public bool ForcePasswordChange { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        // Additional properties specific to your application

        public ICollection<Classroom> CreatedClassrooms { get; set; }
        public ICollection<Problem> CreatedProblems { get; set; }
        public ICollection<Submission> Submissions { get; set; }
        public ICollection<Leaderboard> Leaderboards { get; set; }
        public ICollection<CompetitiveRoom> HostedRooms { get; set; }
        public ICollection<Classroom_Student> ClassroomStudents { get; set; }
        public ICollection<ClassroomProblem> ClassroomProblems { get; set; }
    }

}