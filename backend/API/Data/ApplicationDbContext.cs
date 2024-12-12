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




        public DbSet<PreRegisteredStudent> PreRegisteredStudents { get; set; }
        public DbSet<Problem> Problems { get; set; }
        public DbSet<TestCase> TestCases {get; set;}
        public DbSet<SubmissionEntity> Submissions { get; set; }
        public DbSet<Leaderboard> Leaderboards { get; set; }
        public DbSet<Contest> Contests { get; set; }
        public DbSet<ContestProblem> ContestProblems { get; set; }
        public DbSet<Participant> Participants { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // This ensures Identity-related configurations are applied

            modelBuilder.Entity<SubmissionEntity>()
                .HasKey(s => s.SubmissionID);

                // ApplicationUser - Contest (1-to-many)
            modelBuilder.Entity<Contest>()
                .HasOne(c => c.Host)
                .WithMany(u => u.HostedContests)
                .HasForeignKey(c => c.HostId)
                .OnDelete(DeleteBehavior.Restrict);

            // Contest - Problem (Many-to-Many)
            modelBuilder.Entity<ContestProblem>()
                .HasKey(cp => new { cp.ContestId, cp.ProblemId }); // Composite key

            modelBuilder.Entity<ContestProblem>()
                .HasOne(cp => cp.Contest)
                .WithMany(c => c.ContestProblems)
                .HasForeignKey(cp => cp.ContestId);

            modelBuilder.Entity<ContestProblem>()
                .HasOne(cp => cp.Problem)
                .WithMany(p => p.ContestProblems)
                .HasForeignKey(cp => cp.ProblemId);

            
            modelBuilder.Entity<Participant>()
                .HasKey(p => p.Id);

            // Contest - Participant (1-to-Many)
            modelBuilder.Entity<Participant>()
                .HasOne(p => p.Contest)
                .WithMany(c => c.Participants)
                .HasForeignKey(p => p.ContestId);

            // ApplicationUser - Participant (1-to-Many)
            modelBuilder.Entity<Participant>()
                .HasOne(p => p.User)
                .WithMany(u => u.Participants)
                .HasForeignKey(p => p.UserId);

            // Contest - Submission (1-to-Many)
            modelBuilder.Entity<SubmissionEntity>()
                .HasOne(s => s.Contest)
                .WithMany(c => c.Submissions)
                .HasForeignKey(s => s.ContestId);

            // Problem - Submission (1-to-Many)
            modelBuilder.Entity<SubmissionEntity>()
                .HasOne(s => s.Problem)
                .WithMany(p => p.Submissions)
                .HasForeignKey(s => s.ProblemID);

            // ApplicationUser - Submission (1-to-Many)
            modelBuilder.Entity<SubmissionEntity>()
                .HasOne(s => s.User)
                .WithMany(u => u.Submissions)
                .HasForeignKey(s => s.UserId);


                }

    }

}