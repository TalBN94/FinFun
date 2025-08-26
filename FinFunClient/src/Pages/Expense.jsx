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

  // Expenses hook
  const {
    expenses,
    isLoading,
    error,
    fetchExpenses,
    createExpense
  } = useExpenses();

  // Fetch expenses on mount
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Modal open state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Called by the Form component when submission succeeds
  const handleSubmitSuccess = async (newExpense) => {
    try {
      await createExpense(newExpense);
      // createExpense refreshes the list via fetchExpenses
      handleClose();
    } catch (err) {
      // createExpense already sets error in the hook; log for debug
      console.error('Failed to create expense:', err);
    }
  };

  return (
    <Container sx={{ position: 'relative', top: '6rem' }}>
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
