import React, { useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function BudgetForm() {
  const [amount, setAmount] = useState('');
  const { setBudget } = useBudgetStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    setBudget(amount);
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Set Monthly Budget"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Set
      </button>
    </form>
  );
}