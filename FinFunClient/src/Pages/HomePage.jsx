import React, { useState, useEffect } from "react";
import { Box, Container} from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import PieChartIcon from '@mui/icons-material/PieChart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0)
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:5000/Transaction/names");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <Container sx={{
      height: "100vh",
      width: "100vw",

    }}>
        <Box sx={{ 
          maxWidth: "100vw",
          width: 500, 
          height:200, 
          position: "sticky", 
          bottom: 0,
          display: "flex",
                    
          
          }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        <BottomNavigationAction label="Goals" icon={<PieChartIcon />} />
        <BottomNavigationAction label="Transactions" icon={<CompareArrowsIcon />} />
      </BottomNavigation>
    </Box>

    </Container>
  );
};

export default HomePage;