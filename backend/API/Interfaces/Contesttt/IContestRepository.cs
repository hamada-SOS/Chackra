using API.Dtos.Contest;
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
        // Task DeleteAsync(int id);
    }
}
