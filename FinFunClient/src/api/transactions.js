import API_BASE_URL from "./config";

export const transactionsApi = {

    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/expenses`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    create: async (expenseData) => {
        const response = await fetch(`${API_BASE_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
};