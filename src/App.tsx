import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, IconButton, CircularProgress, ThemeProvider, createTheme, CssBaseline, Alert } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import SearchBar from './components/Search/SearchBar';
import CurrentWeather from './components/Weather/CurrentWeather';
import DailyForecast from './components/Weather/DailyForecast';
import HourlyForecast from './components/Weather/HourlyForecast';
import { Location, WeatherData, getWeatherData } from './services/weatherService';
import { WorldCity } from './types';

const WORLD_CITIES: Location[] = [
  { name: 'Los Angeles', country: 'US', latitude: 34.0522, longitude: -118.2437 },
  { name: 'Seattle', country: 'US', latitude: 47.6062, longitude: -122.3321 },
  { name: 'Boston', country: 'US', latitude: 42.3601, longitude: -71.0589 },
  { name: 'Istanbul', country: 'TR', latitude: 41.0082, longitude: 28.9784 },
  { name: 'Miami', country: 'US', latitude: 25.7617, longitude: -80.1918 },
];

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#f8fafc',
        paper: darkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#1a1a1a',
        secondary: darkMode ? '#b3b3b3' : '#666666',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '0.9rem',
      },
      body2: {
        fontSize: '0.8rem',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            borderRadius: 16,
            backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          },
        },
      },
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const initialLocation = WORLD_CITIES[0];
        const data = await getWeatherData(initialLocation.latitude, initialLocation.longitude);
        setWeatherData(data);
        setLocation(initialLocation);
      } catch (err) {
        setError('Failed to fetch initial weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleLocationSelect = async (location: Location) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(location.latitude, location.longitude);
      setWeatherData(data);
      setLocation(location);
    } catch (err) {
      setError('Failed to fetch weather data for selected location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        p: 3,
        backgroundImage: `url(${darkMode ? 
          '/backgrounds/weatherdashboard-background_darkmode2.jpg' : 
          '/backgrounds/weatherdashboard-background_lightmode2.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.2)',
          zIndex: 0,
        },
        '& > *': {
          position: 'relative',
          zIndex: 1,
        }
      }}>
        <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h1" sx={{ color: 'text.primary' }}>
              Weather Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SearchBar onLocationSelect={handleLocationSelect} />
              <IconButton onClick={() => setDarkMode(!darkMode)} sx={{ color: 'text.primary' }}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : weatherData && location ? (
            <Grid container spacing={3}>
              {/* Main Weather Card */}
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    Forecast in {location.name}, {location.country}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <CurrentWeather 
                        data={weatherData.current} 
                        location={location}
                        onChangeLocation={() => setLocation(null)}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="body2" color="text.secondary">Visibility</Typography>
                          <Typography variant="h2">10km</Typography>
                        </Paper>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="body2" color="text.secondary">Dew Point</Typography>
                          <Typography variant="h2">37°F</Typography>
                        </Paper>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="body2" color="text.secondary">Wind</Typography>
                          <Typography variant="h2">13mph</Typography>
                        </Paper>
                        <Paper sx={{ p: 2 }}>
                          <Typography variant="body2" color="text.secondary">Humidity</Typography>
                          <Typography variant="h2">92%</Typography>
                        </Paper>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
                <DailyForecast 
                  data={weatherData.daily} 
                  hourlyData={weatherData.hourly}
                  selectedDay={selectedDay}
                  onDaySelect={setSelectedDay}
                />
              </Grid>

              {/* Right Column - Other Cities */}
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h2" sx={{ mb: 3 }}>
                    Forecast in Other Cities
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {WORLD_CITIES.map((city, index) => (
                      <Box 
                        key={index}
                        onClick={() => handleLocationSelect(city)}
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 2,
                          borderBottom: index < WORLD_CITIES.length - 1 ? '1px solid' : 'none',
                          borderColor: 'divider',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'rgba(144, 202, 249, 0.1)',
                          }
                        }}
                      >
                        <Box>
                          <Typography variant="body1">{city.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{city.country}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h6">
                            {Math.round((weatherData.current.temperature_2m * 9/5) + 32)}°F / {Math.round(weatherData.current.temperature_2m)}°C
                          </Typography>
                          <Typography variant="body2" color="text.secondary">Clear Sky</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          ) : null}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
