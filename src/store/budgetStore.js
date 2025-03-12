import { create } from 'zustand';

export const useBudgetStore = create((set) => ({
  budget: 1000,
  expenses: [],
  setBudget: (amount) => set({ budget: parseFloat(amount) }),
  addExpense: (category, amount) =>
    set((state) => ({
      expenses: [
        ...state.expenses,
        {
          id: Date.now(),
          category,
          amount: parseFloat(amount).toFixed(2), // Store as string with 2 decimals
          date: new Date().toISOString().split('T')[0],
        },
      ],
    })),
  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),
}));