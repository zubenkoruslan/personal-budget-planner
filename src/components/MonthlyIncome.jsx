import React from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function MonthlyIncome() {
  const { transactions } = useBudgetStore();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  return (
    <div className="p-4 bg-[#2A3550] rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Monthly Income</h2>
      <p className="text-2xl font-bold mb-4">${totalIncome.toFixed(2)}</p>
      <ul className="space-y-2">
        {transactions
          .filter((t) => t.type === 'income')
          .map((transaction) => (
            <li key={transaction.id} className="flex justify-between">
              <span>{transaction.date} - {transaction.category}</span>
              <span>${transaction.amount.toFixed(2)}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}