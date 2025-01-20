import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { Location, weatherCodeToType } from '../../services/weatherService';

interface CurrentWeatherProps {
  data: {
    temperature_2m: number;
    weathercode: number;
    windspeed: number;
    time: string;
  };
  location: Location;
  onChangeLocation: () => void;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const getWeatherIcon = (code: number) => {
    const type = weatherCodeToType(code);
    const iconProps = { size: 48, color: '#666' };
    
    switch (type) {
      case 'sunny':
        return <WiDaySunny {...iconProps} />;
      case 'cloudy':
        return <WiCloudy {...iconProps} />;
      case 'rainy':
        return <WiRain {...iconProps} />;
      case 'snowy':
        return <WiSnow {...iconProps} />;
      case 'storm':
        return <WiThunderstorm {...iconProps} />;
      default:
        return <WiDaySunny {...iconProps} />;
    }
  };

  const celsiusToFahrenheit = (celsius: number) => {
    return (celsius * 9/5) + 32;
  };

  return (
    <Paper 
      sx={{ 
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        bgcolor: 'rgba(255, 255, 255, 0.8)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h1" sx={{ fontSize: '3rem', fontWeight: 'bold' }}>
            {Math.round(celsiusToFahrenheit(data.temperature_2m))}°F
          </Typography>
          <Typography variant="h2" sx={{ fontSize: '1.5rem', color: 'text.secondary' }}>
            {Math.round(data.temperature_2m)}°C
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" color="text.secondary">
            High {Math.round(celsiusToFahrenheit(data.temperature_2m + 2))}°F / {Math.round(data.temperature_2m + 2)}°C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Low {Math.round(celsiusToFahrenheit(data.temperature_2m - 2))}°F / {Math.round(data.temperature_2m - 2)}°C
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {getWeatherIcon(data.weathercode)}
        <Typography variant="body1" color="text.secondary">
          Overcast Clouds
        </Typography>
      </Box>
    </Paper>
  );
};

export default CurrentWeather; 