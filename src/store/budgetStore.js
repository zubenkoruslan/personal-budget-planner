import { create } from 'zustand';

export const useBudgetStore = create((set) => ({
  budget: 1000, // Default monthly budget
  expenses: [],
  setBudget: (amount) => set({ budget: parseFloat(amount) }),
  addExpense: (category, amount) =>
    set((state) => ({
      expenses: [...state.expenses, { id: Date.now(), category, amount: parseFloat(amount), date: new Date().toISOString().split('T')[0] }],
    })),
  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),
}));