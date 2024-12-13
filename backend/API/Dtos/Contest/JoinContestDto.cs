using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Contest
{
public class JoinContestDto
{
    [Required]
    public string JoinCode { get; set; }

    [Required]
    public string UserId { get; set; }
}

}