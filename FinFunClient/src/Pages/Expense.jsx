import { 
  Button, 
  Container, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  CircularProgress,
  Alert 
} from "@mui/material";
import { useState } from "react";
import Form from './TransactionsComponents/Form'

const Expense = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitSuccess = (data) => {
    postTransaction(data);
    getAllTransactions();
    console.log('Form submitted successfully:', data);
  };

  const getAllTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:5001/expenses");
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
      console.log(data.category);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const postTransaction = async (transactionData) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:5001/expenses", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: String(Date.now()), // Generate unique ID
          amount: parseInt(transactionData.amount),
          description: transactionData.description || "",
          category: transactionData.category
        })
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      handleClose(); // Close the form after successful submission
    } catch (error) {
      setError(error.message);
      console.error('Error posting transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Add New Expense
      </Button>

      <Form
        open={open}
        handleClose={handleClose}
        title="Add New Expense"
        apiPath="http://127.0.0.1:5001/expenses"
        onSubmitSuccess={handleSubmitSuccess}
      />

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="expenses table">
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map((expense) => (
                <TableRow
                  key={expense.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell align="right">${expense.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Expense;