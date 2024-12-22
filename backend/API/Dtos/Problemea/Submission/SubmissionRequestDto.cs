using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace API.Dtos.Problemea.Submission
{
    public class SubmissionRequestDto
    {

    public int ProblemID {get;set;}
        
    [JsonProperty("source_code")]
    public string SourceCode { get; set; }
    public bool IsContestProblem {get;set;}

    [JsonProperty("language_id")]
    public int LanguageId { get; set; } 

    public int ContestId {get; set;}
    public string UserId{get;set;}

}
}