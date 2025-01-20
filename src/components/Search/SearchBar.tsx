import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button,
  Popper, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Location, searchLocation } from '../../services/weatherService';

interface SearchBarProps {
  onLocationSelect: (location: Location) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const locations = await searchLocation(query);
          setResults(locations);
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

  const handleLocationClick = (location: Location) => {
    onLocationSelect(location);
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
            {results.map((location, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleLocationClick(location)}
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemText
                  primary={location.name}
                  secondary={location.country}
                  primaryTypographyProps={{
                    color: 'text.primary',
                  }}
                  secondaryTypographyProps={{
                    color: 'text.secondary',
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

export default SearchBar; 