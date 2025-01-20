import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { weatherCodeToType } from '../../services/weatherService';

interface HourlyDetailsProps {
  data: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    precipitation: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };
  selectedDay: number;
}

const HourlyDetails: React.FC<HourlyDetailsProps> = ({ data, selectedDay }) => {
  const WeatherIcon = ({ code }: { code: number }) => {
    const type = weatherCodeToType(code);
    switch (type) {
      case 'sunny':
        return <WiDaySunny size={24} />;
      case 'cloudy':
        return <WiCloudy size={24} />;
      case 'rainy':
        return <WiRain size={24} />;
      case 'snowy':
        return <WiSnow size={24} />;
      case 'storm':
        return <WiThunderstorm size={24} />;
      default:
        return <WiDaySunny size={24} />;
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  // Get the hours for the selected day (24 hours)
  const startIndex = selectedDay * 24;
  const endIndex = startIndex + 24;
  const dayHours = {
    time: data.time.slice(startIndex, endIndex),
    temperature_2m: data.temperature_2m.slice(startIndex, endIndex),
    relative_humidity_2m: data.relative_humidity_2m.slice(startIndex, endIndex),
    precipitation: data.precipitation.slice(startIndex, endIndex),
    wind_speed_10m: data.wind_speed_10m.slice(startIndex, endIndex),
    weather_code: data.weather_code.slice(startIndex, endIndex),
  };

  return (
    <Card sx={{ 
      mt: 2,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Hourly Forecast
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Grid container spacing={2} sx={{ minWidth: 800 }}>
            {dayHours.time.map((time, index) => (
              <Grid item xs={2} key={index}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Typography variant="subtitle2">
                    {formatTime(time)}
                  </Typography>
                  <WeatherIcon code={dayHours.weather_code[index]} />
                  <Typography variant="h6">
                    {Math.round(dayHours.temperature_2m[index])}°C
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 0.5,
                    opacity: 0.7,
                  }}>
                    <Typography variant="caption">
                      {Math.round(dayHours.wind_speed_10m[index])} km/h
                    </Typography>
                    <Typography variant="caption">
                      {Math.round(dayHours.relative_humidity_2m[index])}%
                    </Typography>
                    <Typography variant="caption">
                      {dayHours.precipitation[index]} mm
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HourlyDetails; 