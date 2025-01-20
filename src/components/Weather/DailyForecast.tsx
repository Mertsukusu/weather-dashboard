import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';

interface DailyForecastProps {
  data: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
  hourlyData: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
  selectedDay: number;
  onDaySelect: (day: number) => void;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data, hourlyData, selectedDay, onDaySelect }) => {
  const formatDay = (timeString: string) => {
    const date = new Date(timeString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getWeatherIcon = (code: number) => {
    const iconProps = { size: 32, color: '#666' };
    if (code === 0) return <WiDaySunny {...iconProps} />;
    if (code >= 1 && code <= 3) return <WiCloudy {...iconProps} />;
    if (code >= 51 && code <= 67) return <WiRain {...iconProps} />;
    if (code >= 71 && code <= 77) return <WiSnow {...iconProps} />;
    return <WiCloudy {...iconProps} />;
  };

  const celsiusToFahrenheit = (celsius: number) => {
    return Math.round((celsius * 9/5) + 32);
  };

  // Get current hour
  const currentHour = new Date().getHours();
  
  // Calculate start index for hourly data based on selected day
  const startHourIndex: number = selectedDay === 0 ? currentHour : selectedDay * 24;
  
  // Get 24 hours of data starting from the calculated index
  const selectedHourlyData = hourlyData.time.slice(startHourIndex, startHourIndex + 24).map((time, index) => ({
    time: new Date(time).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    temperature: hourlyData.temperature_2m[startHourIndex + index],
    weathercode: hourlyData.weathercode[startHourIndex + index],
  }));

  // Show 7 days starting from today
  const currentDate = new Date();
  const startIndex = data.time.findIndex(time => 
    new Date(time).toDateString() === currentDate.toDateString()
  );
  
  const days = data.time.slice(startIndex, startIndex + 7);
  const maxTemps = data.temperature_2m_max.slice(startIndex, startIndex + 7);
  const minTemps = data.temperature_2m_min.slice(startIndex, startIndex + 7);
  const weatherCodes = data.weathercode.slice(startIndex, startIndex + 7);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {days.map((day, index) => (
          <Paper
            key={day}
            onClick={() => onDaySelect(index)}
            sx={{
              p: 2,
              flex: '1 1 100px',
              maxWidth: 140,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              bgcolor: selectedDay === index ? 'rgba(144, 202, 249, 0.2)' : 'rgba(255, 255, 255, 0.8)',
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: 'rgba(144, 202, 249, 0.1)',
              }
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                color: selectedDay === index ? 'primary.main' : 'text.secondary',
                fontWeight: selectedDay === index ? 600 : 400,
              }}
            >
              {formatDay(day)}
            </Typography>
            {getWeatherIcon(weatherCodes[index])}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
                {celsiusToFahrenheit(maxTemps[index])}°F / {Math.round(maxTemps[index])}°C
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {celsiusToFahrenheit(minTemps[index])}°F / {Math.round(minTemps[index])}°C
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Hourly Forecast */}
      {selectedDay !== null && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Hourly Forecast - {selectedDay === 0 ? 'Weather Details' : 'Full day (00:00 - 23:00)'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {selectedHourlyData.map((hour, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  minWidth: 80,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {hour.time}
                </Typography>
                {getWeatherIcon(hour.weathercode)}
                <Typography>
                  {celsiusToFahrenheit(hour.temperature)}°F
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DailyForecast; 