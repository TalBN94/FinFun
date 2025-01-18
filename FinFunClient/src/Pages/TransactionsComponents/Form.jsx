import React, { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const form = ({ 
  open, 
  handleClose, 
  title = "Add New Item",  // Default title
  apiPath,                 // API endpoint path
  onSubmitSuccess         // Callback for successful submission
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: 0,
    date: today
  });

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
    setError(null);

    fetch(apiPath, {
      method: "POST",
      body: JSON.stringify({
        id: String(Date.now()),  // Generate unique ID
        amount: parseInt(formData.amount),
        description: formData.description || "",
        category: formData.category,
        date: formData.date
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      }
      resetForm();
      handleClose();
    })
    .catch((error) => {
      console.error('Error:', error);
      setError('Failed to submit form. Please try again.');
    });
  };

  const resetForm = () => {
    setFormData({
      category: '',
      description: '',
      amount: 0,
      date: today
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          px: 2
        }
      }}
    >
      <DialogTitle sx={{ pr: 6 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 12
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3} sx={{ py: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

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

            <TextField
              name="description"
              label="Description (optional)"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={2}
            />

            <TextField
              required
              name="amount"
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              InputProps={{
                inputProps: { min: 0 }
              }}
            />

            <TextField
              required
              name="date"
              label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default form;