import { useState, useEffect } from 'react';
import '../Pages/LogoScreen.css';
import { Box, Fade } from '@mui/material';


  
const bounceInKeyframes = `
  @keyframes bounceIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const SplashScreen = ({ children }) => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    const contentTimeout = setTimeout(() => {
      setShowMainContent(true);
    }, 3000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(contentTimeout);
    };
  }, []);

  return (
    <>
      <style>{bounceInKeyframes}</style>
      <Fade in={showSplash} timeout={1000}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: '#8F00FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'bounceIn 1s ease-out',
            }}
          >
            <Box
              component="h1"
              sx={{
                width: 'auto',
                color: 'white',
                fontSize: '5rem', // Using rem instead of pixels
                height: 'auto',
                maxWidth: '16rem', 
                maxHeight: '12.5rem',
                objectFit: 'contain',
              }}
            >FinFun
            </Box>
          </Box>
        </Box>
      </Fade>
      <Fade in={showMainContent} timeout={1000}>
        <Box>{children}</Box>
      </Fade>
    </>
  );
};


export default SplashScreen;