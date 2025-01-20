import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { WbSunny } from '@mui/icons-material';

interface SunMoonSummaryProps {
  data: {
    sunrise: string[];
    sunset: string[];
  };
}

const SunMoonSummary: React.FC<SunMoonSummaryProps> = ({ data }) => {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Sun & Moon Summary</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            position: 'relative'
          }}>
            <Box sx={{ 
              width: '100%', 
              height: 80, 
              position: 'relative',
              mb: 1
            }}>
              <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '50%',
                borderTop: '2px solid #FFB74D',
                borderRadius: '50% 50% 0 0',
                top: '50%'
              }} />
              <WbSunny sx={{ 
                position: 'absolute',
                top: '25%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#FFB74D',
                fontSize: 32
              }} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Sunrise</Typography>
              <Typography variant="body1">{formatTime(data.sunrise[0])}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            position: 'relative'
          }}>
            <Box sx={{ 
              width: '100%', 
              height: 80, 
              position: 'relative',
              mb: 1
            }}>
              <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '50%',
                borderTop: '2px solid #90CAF9',
                borderRadius: '50% 50% 0 0',
                top: '50%'
              }} />
              <WbSunny sx={{ 
                position: 'absolute',
                top: '75%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#90CAF9',
                fontSize: 32
              }} />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Sunset</Typography>
              <Typography variant="body1">{formatTime(data.sunset[0])}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SunMoonSummary; 