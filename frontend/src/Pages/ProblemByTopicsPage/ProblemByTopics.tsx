import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import { Problem } from '../../Problem'; // Ensure this type is correctly defined
import { fetchProblemsByCategory } from '../../api';

// Define the type for difficulty levels
type DifficultyLevel = 'veryEasy' | 'easy' | 'medium' | 'hard' | 'veryHard';

// Define the interface for filters
interface Filters {
  status: { solved: boolean; unsolved: boolean };
  difficulty: Record<DifficultyLevel, boolean>;
}

const ProblemByTopics = () => {
  const location = useLocation();
  const { topic } = location.state || { topic: null };
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filters, setFilters] = useState<Filters>({
    status: { solved: false, unsolved: false },
    difficulty: { veryEasy: false, easy: false, medium: false, hard: false, veryHard: false },
  });
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]); // State for filtered problems

  useEffect(() => {
    const loadProblems = async () => {
      if (!topic) return;

      try {
        const problemsList = await fetchProblemsByCategory(topic);
        setProblems(problemsList);
      } catch (error) {
        console.error('Error loading problems:', error);
      }
    };

    loadProblems();
  }, [topic]);

  // Filter problems based on the selected filters
  useEffect(() => {
    const applyFilters = () => {
      const { solved, unsolved } = filters.status;
      const difficulties = Object.keys(filters.difficulty).filter(level => filters.difficulty[level as DifficultyLevel]);

      const filtered = problems.filter(problem => {
        const matchesDifficulty = difficulties.length === 0 || difficulties.includes(problem.diffculty);
        return matchesDifficulty;
      });

      setFilteredProblems(filtered);
    };

    applyFilters();
  }, [filters, problems]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Left Side - Scrollable list of problems */}
        <Box sx={{ flex: 2, overflowY: 'scroll', padding: '20px', backgroundColor: '#f3f4fa' }}>
          {filteredProblems.map((problem) => (
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


          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>Difficulty</Typography>
            {(['veryEasy', 'easy', 'medium', 'hard', 'veryHard'] as DifficultyLevel[]).map((level) => (
              <FormControlLabel 
                key={level}
                control={
                  <Checkbox
                    checked={filters.difficulty[level]}
                    onChange={() => setFilters(prev => ({
                      ...prev,
                      difficulty: { ...prev.difficulty, [level]: !prev.difficulty[level] }
                    }))}
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
