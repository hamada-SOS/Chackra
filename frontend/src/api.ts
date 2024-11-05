// api.ts
import axios from 'axios';
import { Problem, ApiResponse, ProblemDetails } from './Problem';

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