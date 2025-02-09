  import { 
    Button, 
    Container, 
    CircularProgress,
    Alert 
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { useExpenses } from '../hooks/useExpenses';
  import Form from './TransactionsComponents/Form';
  import ExpensesByCategory from "./TransactionsComponents/ExpensesByCategory";
  

  const Expense = () => {

   // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Initial form state
    const [formData, setFormData] = useState({
      category: '',
      description: '',
      amount: 0,
      date: today
    });
  
    // Available expense categories
    const categories = [
      'Food & Dining',
      'Transportation',
      'Entertainment',
      'Shopping',
      'Utilities',
      'Healthcare',
      'Education',
      'Other'
    ];
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Form submitted:', formData);
      fetch("http://127.0.0.1:5001/expenses", {
        method: "POST",
        body: JSON.stringify({
          id: "1", 
          amount: parseInt(formData.amount), 
          description: formData.description || "", 
          category: formData.category,
          date: formData.date
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        setFormData({
          category: '',
          description: '',
          amount: 0,
          date: today
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };


    return (
      <Container sx={{position: 'relative', top: '6rem'}}>
        

        <Form
          open={open}
          handleClose={handleClose}
          title="על מה הוצאנו?"
          apiPath="http://127.0.0.1:5001/expenses"
          onSubmitSuccess={handleSubmitSuccess}
        />

     {error && error !== "" && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ExpensesByCategory expenses={expenses} />
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          sx={{ mb: 2, mt: 2 }}
        >
          הוצאה חדשה
        </Button>
      </Container>
    );
  };

  export default Expense;
