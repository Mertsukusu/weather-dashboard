import axios from 'axios';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

interface GeocodingResponse {
  results?: {
    name: string;
    admin1?: string;  // State/Province
    country: string;
    latitude: number;
    longitude: number;
  }[];
  error?: boolean;
  reason?: string;
}

interface OpenMeteoResponse {
  current_weather: {
    temperature: number;
    weathercode: number;
    windspeed: number;
    time: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    precipitation_probability: number[];
    windspeed_10m: number[];
    weathercode: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    weathercode: number[];
  };
}

export interface Location {
  name: string;
  state?: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather;
  hourly: HourlyWeather;
}

export interface CurrentWeather {
  temperature_2m: number;
  weathercode: number;
  windspeed: number;
  time: string;
}

export interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  weathercode: number[];
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  precipitation_probability: number[];
  windspeed_10m: number[];
  weathercode: number[];
}

export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'storm';

export const weatherCodeToType = (code: number): WeatherType => {
  if (code === 0) return 'sunny';
  if (code >= 1 && code <= 3) return 'cloudy';
  if (code >= 51 && code <= 67) return 'rainy';
  if (code >= 71 && code <= 77) return 'snowy';
  if (code >= 95 && code <= 99) return 'storm';
  return 'cloudy';
};

export const weatherCodeToDescription = (code: number): string => {
  const descriptions: { [key: number]: string } = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
  };
  return descriptions[code] || 'Unknown';
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get<OpenMeteoResponse>(WEATHER_API, {
      params: {
        latitude: lat,
        longitude: lon,
        hourly: 'temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m,weathercode',
        daily: 'weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset',
        current_weather: true,
        timezone: 'auto',
        temperature_unit: 'celsius',
        windspeed_unit: 'kmh',
        precipitation_unit: 'mm'
      }
    });

    return {
      current: {
        temperature_2m: response.data.current_weather.temperature,
        weathercode: response.data.current_weather.weathercode,
        windspeed: response.data.current_weather.windspeed,
        time: response.data.current_weather.time
      },
      daily: {
        time: response.data.daily.time,
        temperature_2m_max: response.data.daily.temperature_2m_max,
        temperature_2m_min: response.data.daily.temperature_2m_min,
        sunrise: response.data.daily.sunrise,
        sunset: response.data.daily.sunset,
        weathercode: response.data.daily.weathercode
      },
      hourly: {
        time: response.data.hourly.time,
        temperature_2m: response.data.hourly.temperature_2m,
        relativehumidity_2m: response.data.hourly.relativehumidity_2m,
        precipitation_probability: response.data.hourly.precipitation_probability,
        windspeed_10m: response.data.hourly.windspeed_10m,
        weathercode: response.data.hourly.weathercode
      }
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const searchLocation = async (query: string): Promise<Location[]> => {
  try {
    const response = await axios.get<GeocodingResponse>(GEOCODING_API, {
      params: {
        name: query,
        count: 10,
        format: 'json'
      }
    });

    if (!response.data.results?.length) {
      return [];
    }

    return response.data.results.map(result => ({
      name: result.name,
      state: result.admin1,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude
    }));
  } catch (error) {
    console.error('Error searching location:', error);
    return [];
  }
};

export const getCurrentLocation = async (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get<GeocodingResponse>(GEOCODING_API, {
            params: {
              latitude: latitude.toFixed(4),
              longitude: longitude.toFixed(4),
              count: 1
            }
          });

          if (!response.data.results?.[0]) {
            throw new Error('Location not found');
          }

          const result = response.data.results[0];
          resolve({
            name: result.name,
            state: result.admin1,
            country: result.country,
            latitude: Number(latitude.toFixed(4)),
            longitude: Number(longitude.toFixed(4))
          });
        } catch (error) {
          reject(new Error('Failed to get location details'));
        }
      },
      (error) => {
        reject(new Error('Failed to get current location'));
      }
    );
  });
};

// Major US Cities data
export const MAJOR_US_CITIES = [
  { name: 'Boston', state: 'MA', coords: { lat: 42.3601, lon: -71.0589 } },
  { name: 'New York', state: 'NY', coords: { lat: 40.7128, lon: -74.0060 } },
  { name: 'Los Angeles', state: 'CA', coords: { lat: 34.0522, lon: -118.2437 } },
  { name: 'Dallas', state: 'TX', coords: { lat: 32.7767, lon: -96.7970 } },
  { name: 'Miami', state: 'FL', coords: { lat: 25.7617, lon: -80.1918 } },
  { name: 'Chicago', state: 'IL', coords: { lat: 41.8781, lon: -87.6298 } },
  { name: 'Atlanta', state: 'GA', coords: { lat: 33.7490, lon: -84.3880 } },
  { name: 'Seattle', state: 'WA', coords: { lat: 47.6062, lon: -122.3321 } },
  { name: 'Portland', state: 'OR', coords: { lat: 45.5155, lon: -122.6789 } },
  { name: 'Phoenix', state: 'AZ', coords: { lat: 33.4484, lon: -112.0740 } }
];

const weatherService = {
  searchLocation,
  getWeatherData,
  getCurrentLocation,
};

export default weatherService; 