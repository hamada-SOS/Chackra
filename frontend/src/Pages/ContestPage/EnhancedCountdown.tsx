import React, { useState } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { Box, Button, Typography } from '@mui/material';
import { ThemeContext } from '@emotion/react';

const EnhancedCountdown = () => {
  const countdownDuration = 3600; // 1 hour in milliseconds
  const [startTime, setStartTime] = useState<number | null>(null); // Track the countdown start time
  const [paused, setPaused] = useState<boolean>(false); // Track if the countdown is paused
  const [remainingTime, setRemainingTime] = useState<number>(countdownDuration); // Track remaining time when paused

  // Renderer function to display hours, minutes, and seconds
  const renderer = ({ total, completed }: CountdownRenderProps) => {
    if (completed) {
      return (
        <Typography
        variant="h6"
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'red',
          display:'flex',
          justifyContent:'center'
        }}
      >
        Times up!!!
      </Typography>
      );
    }

    const remainingHours = Math.floor(total / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const remainingSeconds = Math.floor((total % (1000 * 60)) / 1000);

    const progress = ((countdownDuration - total) / countdownDuration) * 100;

    return (
      <Box
        sx={{
          position: 'relative',
          width: '150px',
          height: '150px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Circular Progress Background */}
        <svg width="150" height="150">
          <circle
            cx="75"
            cy="75"
            r="70"
            stroke="#ddd"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="75"
            cy="75"
            r="70"
            stroke="#1976d2"
            strokeWidth="10"
            fill="none"
            strokeDasharray="440"
            strokeDashoffset={440 - (progress / 100) * 440} // Adjust based on progress
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          />
        </svg>

        {/* Remaining Time in the Center */}
        <Typography
          variant="h6"
          sx={{
            position: 'absolute',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1976d2',
          }}
        >
          {`${remainingHours.toString().padStart(2, '0')}:${remainingMinutes
            .toString()
            .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`}
        </Typography>
      </Box>
    );
  };

  // Start the countdown
  const handleStart = () => {
    setStartTime(Date.now() + remainingTime); // Set the countdown end time
    setPaused(false); // Ensure countdown is not paused when starting
  };

  // Pause the countdown
  const handlePause = () => {
    setPaused(true);
    if (startTime) {
      setRemainingTime(startTime - Date.now()); // Calculate remaining time when paused
    }
  };

  // Resume the countdown
  const handleResume = () => {
    setStartTime(Date.now() + remainingTime); // Set the start time to resume countdown from remaining time
    setPaused(false);
  };

  // Restart the countdown
  const handleRestart = () => {
    setRemainingTime(countdownDuration); // Reset remaining time
    setStartTime(null); // Reset the start time
    setPaused(false); // Reset the pause state
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        marginTop: 4,
      }}
    >
      <Box sx={{ position: 'relative', width: '150px', height: '150px' }}>
        {startTime ? (
          <Countdown
            key={paused ? 'paused' : 'running'} // Force re-render to pause/resume
            date={startTime}
            renderer={renderer}
            autoStart={true}
          />
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#aaa',
              display:'flex',
              justifyContent:'center'
            }}
          >
            Ready?
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        {startTime && !paused ? (
          <Button variant="contained" color="secondary" onClick={handlePause}>
            Pause
          </Button>
        ) : startTime && paused ? (
          <Button variant="contained" color="primary" onClick={handleResume}>
            Resume
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start Contest
          </Button>
        )}

        {startTime && (
          <Button variant="contained" color="error" onClick={handleRestart}>
            Restart
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EnhancedCountdown;
