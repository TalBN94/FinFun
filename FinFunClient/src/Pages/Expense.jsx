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
    const today = new Date().toISOString().split('T')[0];
    const { expenses, isLoading, error, fetchExpenses, createExpense } = useExpenses();
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchExpenses();
    }, [fetchExpenses]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


const handleSubmitSuccess = async (data) => {
    try {
      await createExpense(data);
      handleClose();
    } catch (err) {
      console.error('Failed to create expense:', err);
    }
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