using API.Dtos.Contest;
using API.Dtos.Problemea;
using API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces.Contesttt
{
    public interface IContestRepository
    {
        Task <List<ContestDTO>>GetContestCards(string id);
        Task<ContestDetailsDto> GetContestDetails(int id);
        Task <Contest>CreateContest(ContestDTO contest);
        // Task UpdateAsync(Contest contest);
        Task JoinContestAsync(JoinContestDto join);
        Task <string>GenerateUniqueJoinCodeAsync();
        Task AddProblemsToContest(AddProblemsToContestDTO dto);
        Task<List<ProblemDetail>> GetProblemsByContestIdAsync(int contestId);
        Task DeleteProblemFromContestAsync(DeleteContestProblem contestProblemId);
        Task DeleteAsync(DeleteContestDto edto);
    }
}
