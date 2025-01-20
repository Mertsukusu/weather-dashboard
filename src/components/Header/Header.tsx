import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #61BAFF, #A6DEFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          WeatherWise
        </Typography>
        <IconButton 
          onClick={() => setDarkMode(!darkMode)} 
          sx={{ 
            color: darkMode ? '#A6DEFF' : '#61BAFF',
            '&:hover': {
              backgroundColor: 'rgba(97, 186, 255, 0.1)',
            },
          }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        With real-time data and advanced technology, we provide reliable forecasts for any location around the world.
      </Typography>
    </Box>
  );
};

export default Header; 