import React from "react";
import './styles/App.css';
import { ThemeProvider} from '@mui/material/styles';



const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
      
    </ThemeProvider>
    </>
  );
};

export default App;