// api.ts
import axios from 'axios';
import { Problem, ApiResponse } from './Problem';

export const fetchProblemsByCategory = async (category: string): Promise<Problem[]> => {
  try {
    const response = await axios.get<ApiResponse>('/Problem/problmesCardsByCatagory', {
      params: { Catagory: category }
    });

    // Ensure the API response structure matches the interface
    return response.data.data.problems;
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error; // Rethrow to handle in the calling component
  }
};
