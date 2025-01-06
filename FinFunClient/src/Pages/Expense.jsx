import { 
    Container, 
    TextField, 
    MenuItem, 
    Button, 
    Stack, 
    Typography 
  } from '@mui/material';
  import React, { useState } from "react";
  
  const Expense = () => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Initial form state
    const [formData, setFormData] = useState({
      category: '',
      description: '',
      amount: '',
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
      //Add Logic for POST Reuqest in the future
    };
  
    return (
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ py: 4 }}>
            <Typography variant="h5" component="h1">
              Add New Expense
            </Typography>
  
            {/* Category Dropdown */}
            <TextField
              select
              required
              name="category"
              label="Category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
  
            {/* Description Field */}
            <TextField
              name="description"
              label="Description (optional)"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={2}
            />
  
            {/* Amount Field */}
            <TextField
              required
              name="amount"
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
          
            />
  
            {/* Date Field */}
            <TextField
              required
              name="date"
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange}
          
            />
  
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              size="large"
            >
              Add Expense
            </Button>
          </Stack>
        </form>
      </Container>
    );
  };
  
  export default Expense;