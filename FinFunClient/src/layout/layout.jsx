import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Box } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import PieChartIcon from '@mui/icons-material/PieChart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Header from '../components/header/Header';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(() => {
    // Set initial value based on current path
    const pathToIndex = {
      '/': 0,
      '/profile': 1,
      '/goals' :2,
      '/expense': 3,
      '/incomes': 4,
    };
    return pathToIndex[location.pathname] || 0;
  });

  const handleNavigation = (event, newValue) => {
    setValue(newValue);
    const paths = ['/', '/profile','/goals', '/expense', '/incomes'];
    navigate(paths[newValue]);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      pb: '56px', // Height of BottomNavigation
      position: 'relative'
    }}>
      <Header/>
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
          label="מסך ראשי" 
          icon={<DashboardIcon />} 
        />
        <BottomNavigationAction 
          label="פרופיל" 
          icon={<PersonIcon />} 
        />
        <BottomNavigationAction 
          label="יעדים" 
          icon={<PieChartIcon />} 
        />
        <BottomNavigationAction 
          label="הוצאות" 
          icon={<CompareArrowsIcon />} 
        />
        <BottomNavigationAction 
          label="הכנסות" 
          icon={<CompareArrowsIcon />} 
        />
      </BottomNavigation>
      
    </Box>
  );
};

export default Layout;