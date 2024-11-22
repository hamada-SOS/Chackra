using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Problemea.Submission
{
    public class SubmissionRequestDto
    {
    public int ProblemId { get; set; }
    public string Code { get; set; }
    public int LanguageId { get; set; }
    }
}