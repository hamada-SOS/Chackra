using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Evalution
{
    public class TestCaseResultDto
    {
        public string Input { get; set; }
        public string ExpectedOutput { get; set; }
        public string ActualOutput { get; set; }
        public bool Passed { get; set; }
    }
}