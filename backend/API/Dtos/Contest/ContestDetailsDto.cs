using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.Problemea;
using API.Models;

namespace API.Dtos.Contest
{
    public class ContestDetailsDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsActive { get; set; }
        public string HostId {get;set;}
        public string ParticipationType{get;set;}
        public List<ProblemCard> Problems { get; set; }
        public List<Participant> Participants { get; set; }
        public List<SubmissionEntity> Submissions { get; set; }
    

    }
}