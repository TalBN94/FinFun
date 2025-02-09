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
import { Directions, RttOutlined } from "@mui/icons-material";

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
    'אוכל בחוץ',
    'תחבורה',
    'הוצאות מזדמנות',
    'קניות',
    'מוצרי חשמל',
    'הוצאות שוטפות',
    'לימודים',
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 
    // In your Form component, modify the handleSubmit function to just call onSubmitSuccess:
const handleSubmit = (event) => {
  event.preventDefault();
  setError(null);

  // Instead of making the fetch call here, just pass the data to parent
  onSubmitSuccess({
    id: String(Date.now()),
    amount: parseInt(formData.amount),
    description: formData.description || "",
    category: formData.category,
    date: formData.date
  });

  resetForm();
  handleClose();
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
      <DialogContent sx={{textAlign: 'right'}}>
        <form onSubmit={handleSubmit} sx={{direction: 'rtl'}}>
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
              label="קטגוריה"
              value={formData.category}
              onChange={handleChange}
              sx={{ 
                '& .MuiInputBase-input': {
                  textAlign: 'right'
                }
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="description"
              label="פירוט (אופציונלי)"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={2}
            />

            <TextField
              required
              name="amount"
              label="סכום"
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
              label="תאריך"
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
              sx={{
                marginTop: 'rem',
              }}
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