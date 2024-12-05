// problem.d.ts
export interface Problem {
    id: number;
    title: string;
    diffculty: string;
    // Add other fields as necessary
  }
  
  export interface ApiResponse {
    data: {
      problems: Problem[];
      // Add other fields from the API response if needed
    };
    // Common API response fields
    status: string;
    message?: string;
  }

  interface TestCase {
    problemID:number
    testCaseID: number;
    input: string;
    expectedOutput: string;
  }
  
  export interface ProblemDetails {
    ProblemID: number,
    title: string,
    description:string,
    inputFormat:string,
    note:string,
    constraints:string,
    defualtCode:string,
    // catagory:string,
    // difficulty:string,
    sampleInput:string,
    sampleOutput:string,
    testCases:TestCase[]

  }
