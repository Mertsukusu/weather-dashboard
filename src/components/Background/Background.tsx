import React from 'react';
import { Box } from '@mui/material';
import { WeatherType } from '../../services/weatherService';

interface BackgroundProps {
  weatherType: WeatherType;
  cityName?: string;
}

const Background: React.FC<BackgroundProps> = ({ weatherType, cityName }) => {
  const getBackgroundImage = () => {
    if (cityName) {
      return `/backgrounds/${cityName.toLowerCase().replace(' ', '-')}.jpg`;
    }
    return `/backgrounds/${weatherType}.jpg`;
  };

  const getBackgroundOverlay = () => {
    return 'rgba(0, 0, 0, 0.75)';
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
          transition: 'background-image 0.5s ease-in-out',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: getBackgroundOverlay(),
          backdropFilter: 'blur(8px)',
        }
      }}
    />
  );
};

export default Background; 