import { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Popover, 
  Typography,
  Grid2
} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';

const CategoryColorPicker = ({ currentColor, onColorChange, category }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const colors = [
    '#FFB7B7', // Pink
    '#FFE4B5', // Gold
    '#B7E5D7', // Turquoise
    '#E6E6FA', // Light Purple
    '#FFD700', // Gold
    '#98FB98', // Pale Green
    '#DDA0DD', // Plum
    '#F0E68C', // Khaki
    '#87CEEB', // Sky Blue
    '#FFA07A', // Light Salmon
    '#AFEEEE', // Pale Turquoise
    '#D8BFD8'  // Thistle
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color) => {
    onColorChange(category, color);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton 
        onClick={handleClick}
        size="small"
        sx={{ 
          '&:hover': { transform: 'scale(1.1)' },
          transition: 'transform 0.2s'
        }}
      >
        <BrushIcon sx={{ color: 'black' || '#666' }} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 220 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            בחר צבע לקטגוריה
          </Typography>
          <Grid2 container spacing={1}>
            {colors.map((color) => (
              <Grid2 item key={color}>
                <Box
                  onClick={() => handleColorSelect(color)}
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: color,
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: currentColor === color ? '2px solid #000' : '1px solid #ddd',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s'
                    }
                  }}
                />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Popover>
    </>
  );
};

export default CategoryColorPicker;