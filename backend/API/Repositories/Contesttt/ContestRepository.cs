using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces.Contesttt;
using API.Models;
using API.Dtos.Contest;
using Microsoft.EntityFrameworkCore;
using API.Dtos.Problemea;

namespace API.Repositories.Contesttt
{
    public class ContestRepository : IContestRepository
    {
        private readonly ApplicationDbContext _context;

        public ContestRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Contest> CreateContest(ContestDTO contestDTO)
        {
            // Validate required fields if needed
            if (string.IsNullOrEmpty(contestDTO.Name) || string.IsNullOrEmpty(contestDTO.HostId))
                throw new ArgumentException("Name and HostId are required.");

            // Map DTO to entity
            var contest = new Contest
            {
                Name = contestDTO.Name,
                Description = contestDTO.Description,
                StartTime = contestDTO.StartTime,
                EndTime = contestDTO.EndTime,
                HostId = contestDTO.HostId,
                IsActive = false // Initially false, computed based on logic
            };

            // Add to the database
            await _context.Contests.AddAsync(contest);
            await _context.SaveChangesAsync(true);
            
            return contest;
            
        }

        public async Task<List<ContestDTO>> GetContestCards(string id)
        {
            var contestCards = await _context.Contests.
            Where(c => c.HostId == id).
            Select(c => new ContestDTO{
                Name = c.Name,
                Description = c.Description,
                StartTime = c.StartTime,
                EndTime = c.EndTime,
                IsActive = c.IsActive,
                HostId = c.HostId,
                ParticipationType = c.ParticipationType
            }).ToListAsync();

            return contestCards;
        }

        public async Task<ContestDetailsDto> GetContestDetails(int id)
        {        
            var contestDetails = await _context.Contests
            .Where(c => c.Id == id)
            .Include(c => c.Participants) // Include Participants
            .Include(c => c.Submissions) // Include Submissions
            .Include(c => c.ContestProblems) // Include ContestProblems for Problems
                .ThenInclude(cp => cp.Problem)
                .ThenInclude(p => p.TestCases) // Include the related Problem
            .Select(c => new ContestDetailsDto
            {
                Name = c.Name,
                Description = c.Description,
                StartTime = c.StartTime,
                EndTime = c.EndTime,
                IsActive = c.IsActive,
                HostId = c.HostId,
                ParticipationType = c.ParticipationType,
                Problems = c.ContestProblems.Select(cp => new ProblemDetail
                {
                    Title = cp.Problem.Title,
                    Description = cp.Problem.Description,
                    DefualtCode = cp.Problem.DefualtCode,
                    SampleInput = cp.Problem.SampleInput,
                    SampleOutput = cp.Problem.SampleOutput,
                    InputFormat = cp.Problem.InputFormat,
                    Note = cp.Problem.Note,
                    Constraints = cp.Problem.Constraints,
                    TestCases = cp.Problem.TestCases.Select(tc => new TestCase
                    {
                        TestCaseID = tc.TestCaseID,
                        Input = tc.Input,
                        ExpectedOutput = tc.ExpectedOutput,
                    }).ToList()
                }).ToList(),
                Participants = c.Participants.ToList(), // Populate Participants directly
                Submissions = c.Submissions.ToList() // Populate Submissions directly
            })
            .FirstOrDefaultAsync();

            return contestDetails;
            }
        }
}