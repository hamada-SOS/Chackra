import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import { Problem } from '../../Problem'; // Ensure this type is correctly defined
import axios from 'axios';

// Define the type for difficulty levels
type DifficultyLevel = 'veryEasy' | 'easy' | 'medium' | 'hard' | 'veryHard';

// Define the interface for filters
interface Filters {
  status: { solved: boolean; unsolved: boolean };
  difficulty: Record<DifficultyLevel, boolean>;
}

const ProblemByTopics = () => {
  const { topic } = useParams<{ topic: string }>();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filters, setFilters] = useState<Filters>({
    status: { solved: false, unsolved: false },
    difficulty: { veryEasy: false, easy: false, medium: false, hard: false, veryHard: false },
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`http://localhost:5149/api/Problem/problmesCardsByCatagory?Catagory=python`);
        setProblems(response.data); // Adjust based on the structure of your response
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, [topic]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Left Side - Scrollable list of problems */}
        <Box sx={{ flex: 2, overflowY: 'scroll', padding: '20px', backgroundColor: '#f3f4fa' }}>
          {problems.map((problem) => (
            <Box key={problem.id} sx={{
              marginBottom: '20px',
              padding: '20px',
              backgroundColor: '#d6e4f0',
              borderRadius: '8px'
            }}>
              <Typography variant="h6">{problem.title}</Typography>
              <Typography variant="body2">Difficulty: {problem.diffculty}</Typography>
              <Button variant="contained" sx={{ marginTop: '10px' }}>Solve</Button>
            </Box>
          ))}
        </Box>

        {/* Right Side - Filters */}
        <Box sx={{ flex: 1, padding: '20px', backgroundColor: '#e6e9f2' }}>
          <Typography variant="h6" gutterBottom>Status</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.status.solved}
                onChange={() => setFilters({
                  ...filters,
                  status: { ...filters.status, solved: !filters.status.solved }
                })}
              />
            }
            label="Solved"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.status.unsolved}
                onChange={() => setFilters({
                  ...filters,
                  status: { ...filters.status, unsolved: !filters.status.unsolved }
                })}
              />
            }
            label="Unsolved"
          />

          <Typography variant="h6" gutterBottom>Difficulty</Typography>
          {(['veryEasy', 'easy', 'medium', 'hard', 'veryHard'] as DifficultyLevel[]).map((level) => (
            <FormControlLabel
              key={level}
              control={
                <Checkbox
                  checked={filters.difficulty[level]}
                  onChange={() => setFilters({
                    ...filters,
                    difficulty: { ...filters.difficulty, [level]: !filters.difficulty[level] }
                  })}
                />
              }
              label={level.charAt(0).toUpperCase() + level.slice(1)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProblemByTopics;
