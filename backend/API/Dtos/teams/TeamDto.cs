using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.teams
{
    public class TeamDto
{
    public string TeamName { get; set; }
    public List<TeamMemberDto> Members { get; set; }
}

}