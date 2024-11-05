import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

const ProblemtopicsPage = () => {
  const theme = useTheme();
  const topics = ['Python', 'JavaScript', 'Csharp', 'SQL', 'Data Structures', 'Algorithms', 'Java'];
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null); // State to hold the selected topic
  const navigate = useNavigate();

  const handleNavigate = (topic: string) => {
    // Build the route dynamically
    setSelectedTopic(topic);
    navigate(`/ProblemByTopics`,  { state: { topic: topic.toLowerCase() } }); // Navigate to the new route with the topic
    console.log('Navigating to topic:', topic);  // Debugging
  };

  return (
    <Box sx={{ width: '100%', minHeight: '720px', display: 'flex', flexDirection: 'column', background: theme.palette.background.default }}>
      <Navbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#d2dff3', padding: '20px 100px' }}>
        <Typography variant='h6' sx={{ opacity: 0.6 }}>Problem</Typography>
        <Typography variant='h4' color='#010104' sx={{ fontWeight: 600 }}>Solve problems to enhance your skills</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='h5' sx={{ color: 'text.main', padding: '20px 10px', opacity: 0.8 }}>Solve By Topics</Typography>
        <Box sx={{
          display: 'flex',
          width: '800px',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          padding: '20px',
          borderRadius: '10px'
        }}>
          {topics.map((topic) => (
            <Button
              key={topic}
              variant='contained'
              onClick={() => handleNavigate(topic)}
              sx={{
                backgroundColor: '#d6e4f0',
                color: '#000',
                width: '200px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '12px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#b0c4de'
                }
              }}
            >
              <StarIcon sx={{ color: theme.palette.primary.main }} />
              <Typography sx={{ fontWeight: 500 }}>{topic}</Typography>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ProblemtopicsPage;
