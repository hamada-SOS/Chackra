import { Box, Button, Icon, Typography, useTheme } from '@mui/material';
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';

type Props = {}

const ProblemtopicsPage = (props: Props) => {
  const theme = useTheme();

  // List of topics
  const topics = ['Python', 'JavaScript', 'React', 'Algorithms', 'Data Structures', 'SQL'];

  return (
    <>
      <Box sx={{ width: '100%', minHeight: '720px', display: 'flex', flexDirection: 'column', background: theme.palette.background.default }}>
        <Navbar />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#d2dff3', padding: '20px 100px' }}>
          <Typography variant='h6' sx={{ opacity: 0.6 }}>Problem</Typography>
          <Typography variant='h4' color='#010104' sx={{ fontWeight: 600 }}>Solve problems to enhance your skills</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ color: 'text.main', padding: '20px 10px', opacity: 0.8 }}>Solve By Topics</Typography>
          <Box sx={{ width: '1000px', padding: '30px', background: 'white', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {topics.map((topic, index) => (
              <Button
                key={index}
                variant='contained'
                sx={{
                  width: '200px',
                  height: '40px',
                  color: theme.palette.primary.contrastText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon></Icon>
                  {topic}
                </Typography>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProblemtopicsPage;
