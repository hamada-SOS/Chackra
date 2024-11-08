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
  
  export interface ProblemDetails {
    id: number,
    title: string,
    description:string,
    inputFormat:string,
    note:string,
    constraints:string,
    catagory:string,
    difficulty:string,
    smapleInput:string,
    sampleOutput:string,

  }