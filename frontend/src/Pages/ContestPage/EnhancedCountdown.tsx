import React, { useEffect, useState } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { Box, Button, Typography } from '@mui/material';
import { useResultContext } from '../../Global/resultContext';

const EnhancedCountdown = () => {
  const countdownDuration = 360000; // 1 hour in milliseconds
  const [startTime, setStartTime] = useState<number | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(countdownDuration);
  const { isActive, setIsActive } = useResultContext();
  const renderer = ({ total, completed }: CountdownRenderProps) => {
    if (completed) {
      return (
        <Typography
          variant="h6"
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'red',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Time's up!!!
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
            strokeDashoffset={440 - (progress / 100) * 440}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          />
        </svg>
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

  const handleStart = () => {
    setStartTime(Date.now() + remainingTime);
    setPaused(false);
    setIsActive(true)
  };

  const handlePause = () => {
    setPaused(true);
    if (startTime) {
      setRemainingTime(startTime - Date.now());
    }
    setIsActive(false)
  };

  const handleResume = () => {
    setStartTime(Date.now() + remainingTime);
    setPaused(false);
    setIsActive(true)

  };

  const handleRestart = () => {
    setRemainingTime(countdownDuration);
    setStartTime(null);
    setPaused(false);
    setIsActive(false)

  };

    useEffect(() => {
      console.log('isActive state:', isActive);
    }, [isActive]);
    

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
        {startTime && !paused ? (
          <Countdown
            key={startTime} // Force re-render when startTime changes
            date={startTime}
            renderer={renderer}
          />
        ) : paused ? (
          <Typography
            variant="h6"
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#aaa',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Paused
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#aaa',
              display: 'flex',
              justifyContent: 'center',
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
            Start
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
