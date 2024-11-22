using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Dtos.Problemea
{
    public class ProblemDetail
    {
        public int ProblemID {get; set;}
        public string Title { get; set; } // VARCHAR(200)
        public string Description { get; set; } // TEXT

        public string FunctionSignature{get; set;}
        public string DefualtCode{get; set;}

        public string InputFormat { get; set; }
        public string Note { get; set; }
        public string Constraints { get; set; }
        public List<TestCase> TestCases { get; set; }

    }
}