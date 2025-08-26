import React from "react";
import { Routes, Route } from "react-router";
import Dashboard from "../Pages/Dashboard";
import Expense from "../Pages/Expense";
import Income from "../Pages/Income";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/goals" element={<div>To Be Made, Goals.</div>} />
      <Route path="/expense" element={<Expense />} />
      <Route path="/income" element={<Income />} />
      <Route path="/profile" element={<div>Profile Page</div>} />
    </Routes>
  );
};

export default AppRoutes;