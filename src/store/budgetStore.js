import { create } from 'zustand';

export const useBudgetStore = create((set) => ({
  budget: 1000,
  expenses: [], // Reverted from transactions
  setBudget: (amount) => set({ budget: parseFloat(amount) }),
  addExpense: (category, amount) => // Reverted from addTransaction
    set((state) => ({
      expenses: [
        ...state.expenses,
        {
          id: Date.now(),
          category,
          amount: parseFloat(amount).toFixed(2),
          date: new Date().toISOString().split('T')[0],
        },
      ],
    })),
  deleteExpense: (id) => // Reverted from deleteTransaction
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),
  clearExpenses: () => set({ expenses: [] }), // Reverted from clearTransactions
}));