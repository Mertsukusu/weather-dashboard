# Weather Dashboard

A modern, responsive weather dashboard application built with React, TypeScript, and Material-UI. The application provides real-time weather information, hourly forecasts, and daily forecasts for multiple cities.

<img width="1076" alt="image" src="https://github.com/user-attachments/assets/f6a41e82-a13c-4893-86f1-8c9b669dbff2" />

## Features

- **Real-time Weather Data**: Current weather conditions including temperature, weather status, wind speed, and humidity
- **Dual Temperature Display**: Shows temperatures in both Fahrenheit and Celsius
- **7-Day Forecast**: Daily weather forecasts showing high/low temperatures and weather conditions
- **24-Hour Forecast**:
  - For current day: Shows hourly forecast starting from the current hour
  - For other days: Shows full day forecast (00:00 - 23:00)
- **Multiple Cities**: Quick access to weather information for major cities (Los Angeles, Seattle, Boston, Istanbul, Miami)
- **City Search**: Search functionality to find weather information for any city
- **Dark/Light Mode**: Toggle between dark and light themes with custom background images
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technical Stack

- **Frontend Framework**: React with TypeScript
- **UI Library**: Material-UI (MUI)
- **Weather Icons**: react-icons/wi (Weather Icons)
- **API**: Open-Meteo Weather API
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: MUI's styling solution with emotion

## Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── Weather/
│   │   │   ├── CurrentWeather.tsx
│   │   │   ├── DailyForecast.tsx
│   │   │   └── HourlyForecast.tsx
│   │   ├── Search/
│   │   │   └── SearchBar.tsx
│   │   └── Background_pictures/
│   │       ├── weatherdashboard-background_darkmode2.jpg
│   │       └── weatherdashboard-background_lightmode2.jpg
│   ├── services/
│   │   └── weatherService.ts
│   ├── types.ts
│   └── App.tsx
```

## Component Details

### App.tsx

- Main application component
- Manages global state (dark mode, location, weather data)
- Handles API calls and data distribution to child components
- Implements responsive layout using MUI Grid system

### CurrentWeather

- Displays current weather conditions
- Shows temperature in both Fahrenheit and Celsius
- Includes weather icon based on conditions
- Shows high/low temperatures

### DailyForecast

- Shows 7-day weather forecast
- Displays daily high/low temperatures
- Shows weather icons for each day
- Implements day selection for hourly view
- Manages hourly data display (24 hours)

### SearchBar

- Implements city search functionality
- Provides autocomplete suggestions
- Handles location selection

## API Integration

The application uses the Open-Meteo Weather API for weather data:

### Endpoints Used:

- Geocoding API: For city search and coordinates
- Weather Forecast API: For current, hourly, and daily weather data

### Data Structure:

```typescript
interface WeatherData {
  current: {
    temperature_2m: number;
    weathercode: number;
    windspeed: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}
```

## Theme Customization

The application supports both dark and light modes with custom styling:

### Dark Mode:

- Background: Custom dark theme image
- Paper background: rgba(18, 18, 18, 0.8)
- Text: White primary, Light gray secondary

### Light Mode:

- Background: Custom light theme image
- Paper background: rgba(255, 255, 255, 0.8)
- Text: Dark gray primary, Medium gray secondary

## Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
cd weather-dashboard
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Environment Variables

Create a `.env` file in the root directory with:

```
REACT_APP_WEATHER_API_KEY=your_api_key
```

## Build

To build the app for production:

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
