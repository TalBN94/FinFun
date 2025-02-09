import { useState, useCallback } from 'react';
import { transactionsApi } from '../api/transactions';

export const useExpenses = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await transactionsApi.getAll();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createExpense = useCallback(async (expenseData) => {
    try {
      setIsLoading(true);
      setError(null);
      await transactionsApi.create(expenseData);
      // Refresh the expenses list after creating new expense
      await fetchExpenses();
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in the component if needed
    } finally {
      setIsLoading(false);
    }
  }, [fetchExpenses]);

  return {
    expenses: data,
    isLoading,
    error,
    fetchExpenses,
    createExpense
  };
};