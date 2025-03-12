import React, { useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function BudgetForm() {
  const [budget, setBudget] = useState('');
  const { setBudget: setStoreBudget } = useBudgetStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budget && !isNaN(budget)) {
      setStoreBudget(parseFloat(budget));
      setBudget('');
    }
  };

  return (
    <div className="p-4 bg-[#2A3550] rounded-lg shadow-md h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Set Budget</h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter Budget (e.g., 5000)"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
        >
          Set Budget
        </button>
      </form>
    </div>
  );
}