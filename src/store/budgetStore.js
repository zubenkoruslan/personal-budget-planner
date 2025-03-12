import { create } from 'zustand';

export const useBudgetStore = create((set) => ({
  budget: 3560,
  transactions: [
    { id: 1, type: 'expense', category: 'food', amount: 50.00, date: '2024-11-27', reviewed: false },
    { id: 2, type: 'income', category: 'salary', amount: 2800.00, date: '2024-11-15', reviewed: true },
    { id: 3, type: 'expense', category: 'groceries', amount: 75.00, date: '2024-11-28', reviewed: false },
    { id: 4, type: 'expense', category: 'misc', description: 'netflix', amount: 12.99, date: '2024-11-30', reviewed: true },
    { id: 5, type: 'expense', category: 'travel', amount: 200.00, date: '2024-12-03', reviewed: false },
    { id: 6, type: 'income', category: 'freelance', amount: 500.00, date: '2024-11-20', reviewed: true },
    { id: 7, type: 'expense', category: 'shopping', amount: 100.00, date: '2024-12-01', reviewed: false },
  ],
  setBudget: (amount) => set({ budget: parseFloat(amount) || 0 }),
  addTransaction: (type, category, amount, date, description = '') =>
    set((state) => {
      console.log('Adding transaction:', { type, category, amount, date, description });
      if (!amount || isNaN(parseFloat(amount))) {
        console.error('Invalid amount:', amount);
        return state;
      }
      const validAmount = parseFloat(amount).toFixed(2);
      const validCategory = type === 'income' ? (category || 'salary').toLowerCase() : category.toLowerCase();
      if (type === 'expense' && !['food', 'drink', 'travel', 'groceries', 'shopping', 'misc'].includes(validCategory)) {
        console.error('Invalid category for expense:', validCategory);
        return state;
      }
      try {
        return {
          transactions: [
            ...state.transactions,
            {
              id: Date.now(),
              type,
              category: validCategory,
              description: validCategory === 'misc' && type === 'expense' ? description : '',
              amount: validAmount, // Ensure amount is a number as string with 2 decimals
              date,
              reviewed: false,
            },
          ],
        };
      } catch (error) {
        console.error('Error adding transaction:', error);
        return state;
      }
    }),
  deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
  markReviewed: (id) =>
    set((state) => ({
      transactions: state.transactions.map((t) => (t.id === id ? { ...t, reviewed: true } : t)),
    })),
  markAllReviewed: () =>
    set((state) => ({
      transactions: state.transactions.map((t) => ({ ...t, reviewed: true })),
    })),
}));