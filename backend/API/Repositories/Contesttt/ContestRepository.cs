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
using API.Dtos.Participnt;

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
                IsActive = false,
                ParticipationType = contestDTO.ParticipationType,
                JoinCode = await GenerateUniqueJoinCodeAsync()
            };

            // Add to the database
            await _context.Contests.AddAsync(contest);
            await _context.SaveChangesAsync(true);
            
            return contest;
            
        }


        public async Task<List<ContestDTO>> GetContestCards(string id)
        {
            var contestCards = await _context.Contests.
            Where(c => c.HostId == id || c.Participants.Any(p => p.UserId == id)).
            Select(c => new ContestDTO{
                ContestId = c.Id,
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
        .Include(c => c.Participants)
        .Include(c => c.Submissions)
        .Include(c => c.ContestProblems)
            .ThenInclude(cp => cp.Problem)
            .ThenInclude(p => p.TestCases)
        .Select(c => new ContestDetailsDto
        {
            Name = c.Name,
            Description = c.Description,
            StartTime = c.StartTime,
            EndTime = c.EndTime,
            IsActive = c.IsActive,
            HostId = c.HostId,
            ParticipationType = c.ParticipationType,
            Problems = c.ContestProblems.Select(cp => new ProblemCard
            {
                Id = cp.Problem.ProblemID,
                Title = cp.Problem.Title,
                Diffculty = cp.Problem.Difficulty
            }).ToList(),
            Participants = c.Participants
                .Select(p => new ParticipantDto
                {
                    UserId = p.UserId,
                    Username = _context.Users
                        .Where(u => u.Id == p.UserId)
                        .Select(u => u.UserName)
                        .FirstOrDefault(),
                    Team = p.TeamName
                }).ToList(),
            Submissions = c.Submissions.ToList()
        })
        .FirstOrDefaultAsync();

    return contestDetails;
}


        public async Task JoinContestAsync(JoinContestDto join)
        {
            // Find the contest by join code
            var contest = await _context.Contests
                .Include(c => c.Participants)
                .FirstOrDefaultAsync(c => c.JoinCode == join.JoinCode);

            if (contest == null)
                throw new ArgumentException("Invalid join code.");

            // Check if the user is already a participant
            if (contest.Participants.Any(p => p.UserId == join.UserId))
                throw new InvalidOperationException("User is already a participant.");

            // Add the user to the contest
            var participant = new Participant
            {
                UserId = join.UserId,
                ContestId = contest.Id,
                JoinedAt = DateTime.UtcNow
            };

            contest.Participants.Add(participant);

            await _context.SaveChangesAsync();
        }
        public async Task<string> GenerateUniqueJoinCodeAsync()
        {
            string joinCode;
            do
            {
                joinCode = Guid.NewGuid().ToString().Substring(0, 8).ToUpper();
            } while (await _context.Contests.AnyAsync(c => c.JoinCode == joinCode));

            return joinCode;
        }

        public async Task AddProblemsToContest(AddProblemsToContestDTO dto)
        {
        // Fetch the contest
            var contest = await _context.Contests
                .Include(c => c.ContestProblems)
                .FirstOrDefaultAsync(c => c.Id == dto.ContestId);

            if (contest == null)
                throw new Exception("Contest not found.");

            // Check for duplicates
            var existingProblemIds = contest.ContestProblems.Select(cp => cp.ProblemId).ToHashSet();
            var newProblemIds = dto.ProblemIds.Where(pid => !existingProblemIds.Contains(pid)).ToList();

            // Add new problems
            foreach (var problemId in newProblemIds)
            {
                contest.ContestProblems.Add(new ContestProblem
                {
                    ContestId = dto.ContestId,
                    ProblemId = problemId
                });

                
            }

            // Save changes
            await _context.SaveChangesAsync();
        }
        public async Task DeleteProblemFromContestAsync(DeleteContestProblem contestProblemI)
        {
                var problem = await _context.ContestProblems
                .Include(p => p.Problem) // Include participants for validation
                .FirstOrDefaultAsync(cp => cp.ContestId == contestProblemI.ContestId && cp.ProblemId == contestProblemI.ProblemId);

                if (problem == null)
                {
                    throw new KeyNotFoundException($"Problem with ID {contestProblemI.ContestId} was not found.");
                }

                _context.ContestProblems.Remove(problem);
                await _context.SaveChangesAsync();
                return;
        }

        public async Task DeleteAsync(DeleteContestDto edto)
        {
            // Fetch the contest entity by ID
            var contest = await _context.Contests
                .Include(c => c.Participants) // Include participants for validation
                .FirstOrDefaultAsync(c => c.Id == edto.ContestId);

            // If the contest doesn't exist, throw an exception or handle gracefully
            if (contest == null)
            {
                throw new KeyNotFoundException($"Contest with ID {edto.ContestId} was not found.");
            }

            // Check if the user is the host
            if (contest.HostId == edto.UserId)
            {
                // If the user is the host, delete the contest
                _context.Contests.Remove(contest);
                await _context.SaveChangesAsync();
                return;
            }

            // Check if the user is a participant
            var participant = contest.Participants.FirstOrDefault(p => p.UserId == edto.UserId);
            if (participant != null)
            {
                // If the user is a participant, remove them from the contest
                contest.Participants.Remove(participant);
                await _context.SaveChangesAsync();
                return;
            }

            // If the user is neither the host nor a participant, throw an exception
            throw new UnauthorizedAccessException("You are not authorized to delete this contest or your participation.");
        }

    }
}