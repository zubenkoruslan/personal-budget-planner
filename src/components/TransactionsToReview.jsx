import React from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function TransactionsToReview() {
  const { transactions, markReviewed, markAllReviewed } = useBudgetStore();

  const categoryColors = {
    food: 'bg-green-500',
    drink: 'bg-blue-500',
    travel: 'bg-purple-500',
    groceries: 'bg-yellow-500',
    shopping: 'bg-orange-500',
    misc: 'bg-gray-500',
  };

  const getCategoryLabel = (transaction) => {
    if (transaction.category === 'misc' && transaction.description) {
      return `Misc. - ${transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}`;
    }
    return transaction.category.toUpperCase();
  };

  return (
    <div className="p-4 bg-[#2A3550] rounded-lg shadow-md min-h-[200px] flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-4">Transactions to Review</h2>
      <ul className="space-y-2 flex-1">
        {transactions
          .filter((t) => t.type === 'expense' && !t.reviewed)
          .map((transaction) => (
            <li key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => markReviewed(transaction.id)}
                  className="w-4 h-4 text-cyan-500 bg-gray-700 border-gray-600 rounded"
                />
                <span>{transaction.date}</span>
                <span className={`px-2 py-1 text-xs rounded ${categoryColors[transaction.category]}`}>
                  {getCategoryLabel(transaction)}
                </span>
              </div>
              <span>${parseFloat(transaction.amount).toFixed(2)}</span>
            </li>
          ))}
      </ul>
      <button
        onClick={markAllReviewed}
        className="mt-4 text-cyan-400 hover:underline text-sm"
      >
        ✓ Mark all as reviewed
      </button>
    </div>
  );
}