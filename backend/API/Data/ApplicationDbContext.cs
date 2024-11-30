using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }




        public DbSet<PreRegisteredStudent> PreRegisteredStudents { get; set; } // Add this line
        public DbSet<PreRegisteredTeacher> PreRegisteredTeachers { get; set; } // Add this line
        public DbSet<Problem> Problems { get; set; }
       
        public DbSet<TestCase> TestCases {get; set;}
        public DbSet<SubmissionEntity> Submissions { get; set; }
        public DbSet<Leaderboard> Leaderboards { get; set; }
        public DbSet<CompetitiveRoom> CompetitiveRooms { get; set; }
        public DbSet<Room_Problem> RoomProblems { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // This ensures Identity-related configurations are applied

            // Ensure that the TeacherID foreign key is mapped correctly to the AspNetUsers tabl


            // Primary Key Configuration for CompetitiveRoom
            modelBuilder.Entity<CompetitiveRoom>()
                .HasKey(cr => cr.RoomID);  // Ensure the primary key is correctly recognized
            modelBuilder.Entity<SubmissionEntity>()
                .HasKey(s => s.SubmissionID);

            // Many-to-Many: Room_Problem
            modelBuilder.Entity<Room_Problem>()
                .HasKey(rp => new { rp.RoomID, rp.ProblemID });
            modelBuilder.Entity<Room_Problem>()
                .HasOne(rp => rp.Room)
                .WithMany(r => r.RoomProblems)
                .HasForeignKey(rp => rp.RoomID);
            modelBuilder.Entity<Room_Problem>()
                .HasOne(rp => rp.Problem)
                .WithMany(p => p.RoomProblems)
                .HasForeignKey(rp => rp.ProblemID);

        }


    }

}