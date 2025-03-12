import React from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function ExpenseList() {
const { expenses, deleteExpense, clearExpenses } = useBudgetStore(); 

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const categoryColors = {
    groceries: 'bg-red-700',
    utilities: 'bg-blue-500',
    entertainment: 'bg-yellow-500',
    other: 'bg-purple-500',
  };

  return (
    <div className="mt-6">
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses yet.</p> 
      ) : (
        <>
          <button
          onClick={clearExpenses} 
            className="mb-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Clear All Expenses 
          </button>
          <ul className="space-y-4">
            {expenses.map((expense) => ( 
              <li
                key={expense.id}
                className={`flex justify-between items-center p-4 ${categoryColors[expense.category]} text-white rounded-lg shadow-md`}
              >
                <span>
                  {capitalize(expense.category)} - ${parseFloat(expense.amount).toFixed(2)} (
                  {expense.date})
                </span>
                <button
                  onClick={() => deleteExpense(expense.id)} 
                  className="text-white hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}