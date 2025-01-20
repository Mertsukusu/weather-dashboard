import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { WbSunny, Cloud } from '@mui/icons-material';

interface HourlyForecastProps {
  data: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
  selectedDay: number; // 0 for today, 1 for tomorrow, 2 for next day
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, selectedDay }) => {
  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    }).toUpperCase();
  };

  const getWeatherIcon = (code: number) => {
    return code > 2 ? 
      <Cloud sx={{ fontSize: 24, color: 'text.secondary' }} /> : 
      <WbSunny sx={{ fontSize: 24, color: '#FFB74D' }} />;
  };

  // Get current hour
  const currentHour = new Date().getHours();
  
  // Calculate start index based on selected day
  const startIndex = selectedDay === 0 ? 
    currentHour : // Today: start from current hour
    selectedDay * 24; // Other days: start from beginning of the day

  // Get 12 hours of data starting from the calculated index
  const hourlyData = data.time.slice(startIndex, startIndex + 12);
  const temperatures = data.temperature_2m.slice(startIndex, startIndex + 12);
  const weatherCodes = data.weathercode.slice(startIndex, startIndex + 12);

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {hourlyData.map((time, index) => (
          <Box 
            key={time} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              borderBottom: index < hourlyData.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              pb: index < hourlyData.length - 1 ? 2 : 0
            }}
          >
            <Typography sx={{ width: 60, color: 'text.secondary' }}>
              {formatHour(time)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getWeatherIcon(weatherCodes[index])}
              <Typography sx={{ width: 40, textAlign: 'right' }}>
                {Math.round(temperatures[index])}°
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default HourlyForecast; 