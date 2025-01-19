// App.jsx
import React from "react";
import './styles/App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom";

import Layout from "./layout/layout";
import AppWrapper from './components/AppWrapper';
import AppRoutes from './routes/AppRoutes';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create your theme
const theme = createTheme({
  direction: 'rtl',
});

const App = () => {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppWrapper>
            <Layout>
              <AppRoutes />
            </Layout>
          </AppWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;