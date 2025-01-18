import React, { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Dashboard from "./Pages/Dashboard";
import Expense from "./Pages/Expense";
import SplashScreen from "./Pages/LogoScreen";
import Layout from "./layout/layout";
// Wrapper component to handle splash screen logic
const AppWrapper = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return children;
};

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/goals" element={<div>To Be Made, Goals.</div>} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/profile" element={<div>Profile Page</div>} />
          </Routes>
        </Layout>
      </AppWrapper>
    </BrowserRouter>
  </StrictMode>
);