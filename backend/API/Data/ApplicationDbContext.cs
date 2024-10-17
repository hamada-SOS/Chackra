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
        public DbSet<Classroom_Student> ClassroomStudents { get; set; }
        public DbSet<Problem> Problems { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<ClassroomProblem> ClassroomProblems { get; set; }
        public DbSet<Submission> Submissions { get; set; }
        public DbSet<Leaderboard> Leaderboards { get; set; }
        public DbSet<CompetitiveRoom> CompetitiveRooms { get; set; }
        public DbSet<Room_Problem> RoomProblems { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // This ensures Identity-related configurations are applied

            // Ensure that the TeacherID foreign key is mapped correctly to the AspNetUsers table
            modelBuilder.Entity<Classroom>()
                .HasOne(c => c.Mentor)
                .WithMany()
                .HasForeignKey(c => c.MentorID)
                .OnDelete(DeleteBehavior.Cascade); // Or whatever behavior is needed


            // Many-to-Many: Classroom_Student
            modelBuilder.Entity<Classroom_Student>()
                .HasKey(cs => new { cs.ClassroomID, cs.StudentID });
            modelBuilder.Entity<Classroom_Student>()
                .HasOne(cs => cs.Classroom)
                .WithMany(c => c.ClassroomStudents)
                .HasForeignKey(cs => cs.ClassroomID)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Classroom_Student>()
                .HasOne(cs => cs.Student)
                .WithMany(u => u.ClassroomStudents)
                .HasForeignKey(cs => cs.StudentID)
                .OnDelete(DeleteBehavior.Restrict);

            // Primary Key Configuration for CompetitiveRoom
            modelBuilder.Entity<CompetitiveRoom>()
                .HasKey(cr => cr.RoomID);  // Ensure the primary key is correctly recognized

            // Many-to-Many: Classroom_Problem
            modelBuilder.Entity<ClassroomProblem>()
                .HasKey(cp => new { cp.ClassroomID, cp.ProblemID });
            modelBuilder.Entity<ClassroomProblem>()
                .HasOne(cp => cp.Classroom)
                .WithMany(c => c.ClassroomProblems)
                .HasForeignKey(cp => cp.ClassroomID);
            modelBuilder.Entity<ClassroomProblem>()
                .HasOne(cp => cp.Problem)
                .WithMany(p => p.ClassroomProblems)
                .HasForeignKey(cp => cp.ProblemID);

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