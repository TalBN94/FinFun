  import React, { useState, useEffect } from "react";
  import { Box, Container } from '@mui/material';
  import { NavLink } from "react-router";  // Fixed import
  import Header from "../components/header/Header";

  const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetch("http://127.0.0.1:5001/expenses");
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

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <Container sx={{
        height: "100vh",
        width: "100vw",
        paddingRight: 0,
        paddingLeft: 0,
        margin: 0,
      }}>
        <Header />
        <Box sx={{
          maxWidth: "100vw",
          width: "100vw",
          height: "90vh",
          position: "sticky",
          bottom: 0,
        }}>

        </Box>
        <NavLink to="/expense">Link to Expense Pages</NavLink>
      </Container>
    );
  };

  export default Dashboard;