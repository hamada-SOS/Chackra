using System;

namespace API.Models
{
    public class TestCase
    {
        public int TestCaseID { get; set; } // Primary Key
        public string Input { get; set; } // Input for the test case
        public string ExpectedOutput { get; set; } // Expected output for the test case
        public int ProblemID { get; set; } // Foreign key linking to Problem

        // Navigation Property
        public Problem Problem { get; set; } // Reference to associated Problem
    }
}
