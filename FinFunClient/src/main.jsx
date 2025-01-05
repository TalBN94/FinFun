import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import HomePage from "./Pages/HomePage";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
  </StrictMode>
);
