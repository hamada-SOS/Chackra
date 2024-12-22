import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import { Problem } from '../../Problem'; // Ensure this type is correctly defined
import { fetchProblemsByCategory } from '../../api';

type DifficultyLevels = 'VeryEasy' | 'Easy' | 'Medium' | 'Hard' | 'VeryHard';

const ProblemByTopics = () => {
  const location = useLocation();
  const { topic } = location.state || { topic: null };
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [filters, setFilters] = useState<{
    difficulty: Record<DifficultyLevels, boolean>;
  }>({
    difficulty: { VeryEasy: true, Easy: true, Medium: false, Hard: false, VeryHard: false },
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const loadProblems = async () => {
      if (!topic) return;

      try {
        const problemsList = await fetchProblemsByCategory(topic);
        setProblems(problemsList);
        setFilteredProblems(problemsList); // Initially show all problems
      } catch (error) {
        console.error('Error loading problems:', error);
      }
    };

    loadProblems();
  }, [topic]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = problems;

      // Filter by difficulty
      const activeDifficulties = Object.keys(filters.difficulty).filter(
        (key) => filters.difficulty[key as DifficultyLevels]
      );

      if (activeDifficulties.length > 0) {
        filtered = filtered.filter((problem) =>
          activeDifficulties.includes(problem.diffculty)
        );
      }

      setFilteredProblems(filtered);
    };

    applyFilters();
  }, [filters, problems]);

  const handleSolveClick = (id: number) => {
    navigate(`/SolvingPage`, { state: { id, isContestProblem: false } });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Left Side - Scrollable list of problems */}
        <Box sx={{ flex: 2, overflowY: 'scroll', padding: '20px', backgroundColor: '#f3f4fa' }}>
          {filteredProblems.map((problem) => (
            <Box
              key={problem.id}
              sx={{
                marginBottom: '20px',
                padding: '20px',
                backgroundColor: '#d6e4f0',
                borderRadius: '8px',
              }}
            >
              <Typography variant="h6">{problem.title}</Typography>
              <Typography variant="body2">Difficulty: {problem.diffculty}</Typography>
              <Button
                onClick={() => handleSolveClick(problem.id)}
                variant="contained"
                sx={{ marginTop: '10px' }}
              >
                Solve
              </Button>
            </Box>
          ))}
        </Box>

        {/* Right Side - Filters */}
        <Box sx={{ flex: 1, padding: '20px', backgroundColor: '#e6e9f2' }}>
          <Typography variant="h6" gutterBottom>Difficulty</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {(['VeryEasy', 'Easy', 'Medium', 'Hard', 'VeryHard'] as DifficultyLevels[]).map((level) => (
              <FormControlLabel
                key={level}
                control={
                  <Checkbox
                    checked={filters.difficulty[level]}
                    onChange={() => setFilters({
                      ...filters,
                      difficulty: { ...filters.difficulty, [level]: !filters.difficulty[level] },
                    })}
                  />
                }
                label={level.charAt(0).toUpperCase() + level.slice(1)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProblemByTopics;
