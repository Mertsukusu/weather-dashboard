import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { WiStrongWind, WiHumidity, WiBarometer } from 'react-icons/wi';
import { WeatherData } from '../../services/weatherService';

interface WeatherStatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const WeatherStat: React.FC<WeatherStatProps> = ({ icon, title, value }) => (
  <Paper sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      <Box sx={{ color: 'primary.main' }}>{icon}</Box>
      <Typography variant="body2">{title}</Typography>
    </Box>
    <Typography variant="h6">{value}</Typography>
  </Paper>
);

interface WorldCitiesProps {
  weather: WeatherData;
}

const WorldCities: React.FC<WorldCitiesProps> = ({ weather }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Weather Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <WeatherStat
            icon={<WiStrongWind />}
            title="Wind"
            value={`${Math.round(weather.current.windspeed)} km/h`}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <WeatherStat
            icon={<WiHumidity />}
            title="Humidity"
            value={`${Math.round(weather.hourly.relativehumidity_2m[0])}%`}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <WeatherStat
            icon={<WiBarometer />}
            title="Feels Like"
            value={`${Math.round(weather.current.temperature_2m)}°`}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorldCities; 