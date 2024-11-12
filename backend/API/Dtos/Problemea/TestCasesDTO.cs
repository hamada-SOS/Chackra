namespace API.Dtos.Problemea
{
    public class TestCaseDTO
    {
        public int TestCaseID { get; set; }  // Unique identifier for the test case
        public string Input { get; set; }    // Input for the test case
        public string ExpectedOutput { get; set; }  // Expected output for the test case
    }
}
