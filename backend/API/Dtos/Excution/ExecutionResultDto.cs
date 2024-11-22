using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Excution
{
    public class ExecutionResultDto
    {
    public string Stdout { get; set; }
    public string Stderr { get; set; }
    public int ExitCode { get; set; }
    public double ExecutionTime { get; set; }
    }
}