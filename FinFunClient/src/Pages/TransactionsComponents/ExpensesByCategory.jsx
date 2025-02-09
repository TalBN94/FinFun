import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryColorPicker from '../PagesComponents/CategoryColorPicker';
import { useState, useEffect } from 'react';

const ExpensesByCategory = ({ expenses }) => {
  const [categoryColors, setCategoryColors] = useState(() => {
    // Load saved colors from localStorage
    const savedColors = localStorage.getItem('categoryColors');
    return savedColors ? JSON.parse(savedColors) : {};
  });

  if (!expenses || expenses.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 4, 
        color: 'text.secondary',
        direction: 'rtl'
      }}>
        <Typography variant="h6">
          אין הוצאות להצגה
        </Typography>
        <Typography variant="body2">
          התחל להוסיף הוצאות על ידי לחיצה על כפתור "הוצאה חדשה"
        </Typography>
      </Box>
    );
  }

  // Save colors to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('categoryColors', JSON.stringify(categoryColors));
  }, [categoryColors]);

  const handleColorChange = (category, color) => {
    setCategoryColors(prev => ({
      ...prev,
      [category]: color
    }));
  };

  // Group expenses by category
  const groupedExpenses = expenses?.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = [];
    }
    acc[expense.category].push(expense);
    return acc;
  }, {}) || {};

  // Calculate total amount for each category
  const calculateCategoryTotal = (expenses) => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {Object.entries(groupedExpenses).map(([category, categoryExpenses]) => (
        <Accordion 
          key={category} 
          sx={{ 
            mb: 1,
            bgcolor: categoryColors[category] || 'background.paper',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${category}-content`}
            id={`${category}-header`}
            sx={{
              '&:hover': { bgcolor: categoryColors[category] ? `${categoryColors[category]}CC` : 'primary.main', color: 'text.primary' }
            }}
          >
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CategoryColorPicker
                  currentColor={categoryColors[category]}
                  onColorChange={handleColorChange}
                  category={category}
                />
                <Typography variant="p" sx={{
                  fontSize: '1rem',
                  marginRight: '1rem',
                }}>{category}</Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                סה"כ: ₪{calculateCategoryTotal(categoryExpenses)}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ 
              width: '100%', 
              bgcolor: 'background.paper',
              borderRadius: 1
            }}>
              {categoryExpenses.map((expense) => (
                <ListItem
                  key={expense.id}
                  divider
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    '&:hover': { backgroundColor: 'action.hover' }
                  }}
                >
                  <ListItemText
                    primary={expense.description || 'אין פירוט'}
                    secondary={`תאריך: ${new Date(parseInt(expense.id)).toLocaleDateString()}`}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    ₪{expense.amount}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ExpensesByCategory;