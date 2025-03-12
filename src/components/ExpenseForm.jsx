import React, { useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function ExpenseForm() {
  const [category, setCategory] = useState('groceries');
  const [amount, setAmount] = useState('');
  const { addExpense } = useBudgetStore(); // Reverted

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) return;
    addExpense(category, parsedAmount);
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto mt-6">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="groceries">Groceries</option>
        <option value="utilities">Utilities</option>
        <option value="entertainment">Entertainment</option>
        <option value="other">Other</option>
      </select>
      <input
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Expense Amount (e.g., 19.99)" // Reverted
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Add
      </button>
    </form>
  );
}