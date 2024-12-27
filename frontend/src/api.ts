// api.ts
import axios from 'axios';
import { Problem, ApiResponse, ProblemDetails, ContesttDetails, ContestCards } from './Problem';

export const fetchProblemsByCategory = async (topic: string): Promise<Problem[]> => {
  try {
    const response = await axios.get(`http://localhost:5149/api/Problem/problmesCardsByCatagory?Catagory=${topic}`);

    // Ensure the API response structure matches the interface
    return response.data;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error; // Rethrow to handle in the calling component
  }
};

export const fetchProblemDetails = async (id: number): Promise<ProblemDetails> => {
  try{
    const response = await axios.get(`http://localhost:5149/api/Problem/problmesByID/${id}`);
    return response.data;
  }
  catch(error){
    console.error('Error fetcing prblems:', error)
    throw error;
  }
};


/**
 * Fetch contest details by ID.
 * @param contestId - The ID of the contest.
 * @returns A Promise resolving to contest details.
 */
export const fetchContestDetails = async (contestId: number): Promise<ContesttDetails> => {
  try {
    const response = await axios.get("http://localhost:5149/api/Contest/contestDetails", {
      params: { id: contestId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching contest details:', error);
    throw error;
  }
};



/**
 * Add problems to a contest.
 * @param contestId - The ID of the contest.
 * @param problemIds - Array of problem IDs to be added.
 * @returns A Promise resolving to the response data.
 */
export const addProblemsToContest = async (contestId: number, problemIds: number[]): Promise<any> => {
  try {
    const requestData = {
      contestId,
      problemIds,
    };
    const response = await axios.post("http://localhost:5149/api/Contest/add-problems", requestData);
    return response.data;
  } catch (error) {
    console.error('Error adding problems to contest:', error);
    throw error;
  }
};



/**
 * Delete a problem from a contest.
 * @param contestId - The ID of the contest.
 * @param problemId - The ID of the problem to be deleted.
 * @returns A Promise resolving to the response data.
 */
export const deleteProblemFromContest = async (contestId: number, problemId: number): Promise<any> => {
  try {
    const response = await axios.delete("http://localhost:5149/api/Contest/deletecP", {
      data: {
        contestId,
        problemId,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting problem from contest:', error);
    throw error;
  }
};


// Fetch contests associated with a user
export const fetchUserContests = async (userId: string | null): Promise<ContestCards[]> => {
  try {
    const response = await axios.get("http://localhost:5149/api/Contest/GetContestCards", {
      params: { id: userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contests:", error);
    throw error; // Rethrow to handle in the calling component
  }
};

// Join a contest
export const joinContest = async (userId: string | null, joinCode: string): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:5149/api/Contest/join", {
      userId,
      joincode: joinCode,
    });
    return response.data; // Assuming the API returns a success message
  } catch (error) {
    console.error("Error joining contest:", error);
    throw error; // Rethrow to handle in the calling component
  }
};

// Create a new contest
export const createContest = async (newContestData: Partial<ContestCards>): Promise<string> => {
  try {
    const response = await axios.post("http://localhost:5149/api/Contest/Create", {
      ...newContestData,
    });
    return response.data; // Assuming the API returns a success message
  } catch (error) {
    console.error("Error creating contest:", error);
    throw error; // Rethrow to handle in the calling component
  }
};

export const fetchContestProblems = async (contestId: number): Promise<ProblemDetails[]> => {
  try {
    const response = await axios.get("http://localhost:5149/api/Contest/GetContestProblems", {
      params: { contestId: contestId  },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contests:", error);
    throw error; // Rethrow to handle in the calling component
  }
};