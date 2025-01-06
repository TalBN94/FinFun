import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./Pages/HomePage";
import Expense from "./Pages/Expense";
import SplashScreen from "./Pages/LogoScreen";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  
  <StrictMode>
    <BrowserRouter>
    <SplashScreen>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/expense" element={<Expense/>} />
      </Routes>
     </SplashScreen>
    </BrowserRouter>
  </StrictMode>
);
