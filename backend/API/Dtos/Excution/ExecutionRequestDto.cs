using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Excution
{
    public class ExecutionRequestDto
    {
    public string SourceCode { get; set; }
    public string Stdin { get; set; }
    public int LanguageId { get; set; }
    }
}