import React from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function ExpenseList() {
  const { expenses, deleteExpense } = useBudgetStore();

  return (
    <div className="mt-6">
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses yet.</p>
      ) : (
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md"
            >
              <span>
                {expense.category} - ${expense.amount.toFixed(2)} ({expense.date})
              </span>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}