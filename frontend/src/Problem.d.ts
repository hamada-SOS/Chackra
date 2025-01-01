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

  interface SubmissionResult {
    SubmissionId: number;
    PassedAllTestCases: boolean;
    testCaseResults: TestCaseResult[];
    error:string;
    team:string;
    score:number
  }
  interface TestCaseResult{
    input: string,
    expectedOutput: string,
    output: string,
    passed: boolean
  }
  export interface ProblemDetails {
    problemID: number,
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
  export interface ContestCards{
    contestId:number;
    name: string;
    description: string;
    startTime: string; // ISO string for date
    endTime: string; // ISO string for date
    isActive: boolean;
    hostId: string;
    participationType: string;
  }

  export interface Participants{
    id:number;
    contestId:number;
    userId:string;
    username:string;
    team:string;
  }

  export interface ContesttDetails{
    contestId:number;
    name: string;
    description: string;
    startTime: string; // ISO string for date
    endTime: string; // ISO string for date
    isActive: boolean;
    hostId: string;
    participationType: string;
    problems: Problem[]
    participants: Participants[]
  }


  export interface newContest{
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    hostId: string;
    participationType: string;
    joinCode: string;
  }

  interface LeaderboardData {
    teamA: Team;
    teamB: Team;
  }
  
  interface Team {
    name: string;
    members: string[];
    progress: number;
  }
  