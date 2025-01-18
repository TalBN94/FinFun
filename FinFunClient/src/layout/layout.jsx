import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Box } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import PieChartIcon from '@mui/icons-material/PieChart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(() => {
    // Set initial value based on current path
    const pathToIndex = {
      '/': 0,
      '/profile': 1,
      '/goals' :2,
      '/expense': 3
    };
    return pathToIndex[location.pathname] || 1;
  });

  const handleNavigation = (event, newValue) => {
    setValue(newValue);
    const paths = ['/', '/profile','/goals', '/expense'];
    navigate(paths[newValue]);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pb: '56px', // Height of BottomNavigation
      position: 'relative'
    }}>
      <Box component="main" sx={{ height: '100%' }}>
        {children}
      </Box>

      <BottomNavigation
        value={value}
        onChange={handleNavigation}
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
          '& .MuiBottomNavigationAction-root': {
            color: '#757575',
            '&.Mui-selected': {
              color: '#8F00FF'
            }
          }
        }}
      >
        <BottomNavigationAction 
          label="Dashboard" 
          icon={<DashboardIcon />} 
        />
        <BottomNavigationAction 
          label="Profile" 
          icon={<PersonIcon />} 
        />
        <BottomNavigationAction 
          label="Goals" 
          icon={<PieChartIcon />} 
        />
        <BottomNavigationAction 
          label="Expenses" 
          icon={<CompareArrowsIcon />} 
        />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;