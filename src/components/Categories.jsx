import React from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function Categories() {
  const { transactions } = useBudgetStore();

  const categoryTotals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      const categoryKey = transaction.category === 'misc' && transaction.description
        ? `misc-${transaction.description.toLowerCase()}`
        : transaction.category;
      acc[categoryKey] = (acc[categoryKey] || 0) + amount;
      return acc;
    }, {});

  const categoryBudgets = {
    food: 300,
    drink: 150,
    travel: 500,
    groceries: 400,
    shopping: 250,
    misc: 200,
  };

  const categoryColors = {
    food: 'bg-green-500',
    drink: 'bg-blue-500',
    travel: 'bg-purple-500',
    groceries: 'bg-yellow-500',
    shopping: 'bg-orange-500',
    misc: 'bg-gray-500',
  };

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="p-4 bg-[#2A3550] rounded-lg shadow-md h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="flex-1">
        {sortedCategories.map(([category, total], index) => {
          const displayCategory = category.startsWith('misc-')
            ? `Misc. - ${category.replace('misc-', '').charAt(0).toUpperCase() + category.replace('misc-', '').slice(1)}`
            : category.charAt(0).toUpperCase() + category.slice(1);
          const budget = categoryBudgets[category.split('-')[0]] || 1000;
          const percentage = Math.min((total / budget) * 100, 100);
          return (
            <div key={category} className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{displayCategory}</span>
                <span>${total.toFixed(0)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${categoryColors[category.split('-')[0]] || 'bg-gray-500'}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}