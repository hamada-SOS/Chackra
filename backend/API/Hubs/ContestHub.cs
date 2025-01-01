using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace API.Hubs
{
    public class ContestHub : Hub
    {
        // Add connection to contest group
        public async Task JoinContestGroup(int contestId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"Contest_{contestId}");
        }

        // Remove connection from contest group
        public async Task LeaveContestGroup(int contestId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"Contest_{contestId}");
        }

        // Broadcast leaderboard updates
        public async Task BroadcastLeaderboardUpdate(int contestId, object leaderboardData)
        {
            await Clients.Group($"Contest_{contestId}").SendAsync("ReceiveLeaderboardUpdate", leaderboardData);
        }
    }
}
