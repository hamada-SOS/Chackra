using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Contest
{
    public class DeleteContestDto
    {
    [Required]
    public string UserId { get; set; }

    [Required]
    public int ContestId { get; set; }
    }
}