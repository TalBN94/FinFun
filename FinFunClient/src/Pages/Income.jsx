import { 
  Button, 
  Container, 
  CircularProgress,
  Alert 
} from "@mui/material";
import { useState, useEffect } from "react";
import { useIncomes } from '../hooks/useIncomes';
import Form from './TransactionsComponents/Form';
import ExpensesByCategory from "./TransactionsComponents/ExpensesByCategory";

const Income = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Incomes hook
  const {
    incomes,
    isLoading,
    error,
    fetchIncomes,
    createIncome
  } = useIncomes();

  // Fetch incomes on mount
  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  // Modal open state
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Called by the Form component when submission succeeds
  const handleSubmitSuccess = async (newIncome) => {
    try {
      await createIncome(newIncome);
      // createIncome refreshes the list via fetchIncomes
      handleClose();
    } catch (err) {
      // createIncome already sets error in the hook; log for debug
      console.error('Failed to create income:', err);
    }
  };

  return (
    <Container sx={{ position: 'relative', top: '6rem' }}>
      <Form
        open={open}
        handleClose={handleClose}
        title="על מה קיבלנו?"
        apiPath="http://127.0.0.1:5001/incomes"
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
        <ExpensesByCategory expenses={incomes} />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ mb: 2, mt: 2 }}
      >
        הכנסה חדשה
      </Button>
    </Container>
  );
};

export default Income;