import React from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function ExpenseIncomeBreakdown() {
  const { transactions } = useBudgetStore();

  const categoryColors = {
    food: 'bg-green-500',
    drink: 'bg-blue-500',
    travel: 'bg-purple-500',
    groceries: 'bg-yellow-500',
    shopping: 'bg-orange-500',
    misc: 'bg-gray-500',
    income: 'bg-blue-400', // Changed to blue
  };

  const getCategoryLabel = (transaction) => {
    if (transaction.type === 'income') {
      return 'Income';
    }
    if (transaction.category === 'misc' && transaction.description) {
      return `Misc. - ${transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}`;
    }
    return transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1);
  };

  return (
    <div className="p-4 bg-[#2A3550] rounded-lg shadow-md h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Expense & Income Breakdown</h2>
      <ul className="space-y-2 flex-1 overflow-y-auto">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>{transaction.date}</span>
              <span className={`px-2 py-1 text-xs rounded ${categoryColors[transaction.type === 'income' ? 'income' : transaction.category] || 'bg-gray-500'}`}>
                {getCategoryLabel(transaction)}
              </span>
            </div>
            <span className={transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}>
              ${parseFloat(transaction.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}