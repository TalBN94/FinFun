import { useState, useCallback } from 'react';
import { incomesApi } from '../api/transactions';

export const useIncomes = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIncomes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await incomesApi.getAll();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createIncome = useCallback(async (incomeData) => {
    try {
      setIsLoading(true);
      setError(null);
      await incomesApi.create(incomeData);
      // Refresh the incomes list after creating new income
      await fetchIncomes();
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw to handle in the component if needed
    } finally {
      setIsLoading(false);
    }
  }, [fetchIncomes]);

  return {
    incomes: data,
    isLoading,
    error,
    fetchIncomes,
    createIncome
  };
};