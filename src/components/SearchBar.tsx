import { Box, TextField, Popper, Paper, List, ListItem, ListItemText, InputAdornment, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { searchLocation } from '../services/weatherService';
import { WorldCity } from '../types';

interface SearchBarProps {
  onLocationSelect: (city: WorldCity) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<WorldCity[]>([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const locations = await searchLocation(query);
          setResults(locations.map(loc => ({
            name: loc.name,
            coords: {
              lat: loc.latitude,
              lon: loc.longitude
            }
          })));
        } catch (error) {
          console.error('Error searching locations:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  const handleLocationClick = (city: WorldCity) => {
    onLocationSelect(city);
    setQuery('');
    setResults([]);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, position: 'relative' }}>
      <TextField
        fullWidth
        placeholder="Search for a city..."
        value={query}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {loading && <CircularProgress size={20} />}
            </InputAdornment>
          ),
          sx: {
            bgcolor: 'background.paper',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          },
        }}
      />
      <Popper
        open={Boolean(results.length)}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ width: anchorEl?.clientWidth, zIndex: 1000 }}
      >
        <Paper sx={{ mt: 1, maxHeight: 300, overflow: 'auto' }}>
          <List>
            {results.map((city, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleLocationClick(city)}
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemText
                  primary={city.name}
                  primaryTypographyProps={{
                    color: 'text.primary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
}; 