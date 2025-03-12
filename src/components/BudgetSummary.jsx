import React from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetSummary() {
  const { budget, expenses } = useBudgetStore();

  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
  const remaining = budget - totalSpent;

  const categoryTotals = expenses.reduce((acc, expense) => {
    const amount = parseFloat(expense.amount);
    acc[expense.category] = (acc[expense.category] || 0) + amount;
    return acc;
  }, {});

  const categoryColors = {
    groceries: '#D32F2F', // Red-700
    utilities: '#3B82F6', // Blue-500
    entertainment: '#F59E0B', // Yellow-500
    other: '#8B5CF6', // Purple-500
  };

  const categories = Object.keys(categoryTotals);
  const dataValues = categories.map((cat) => categoryTotals[cat]);
  if (remaining > 0) {
    dataValues.push(remaining);
  }

  const chartData = {
    labels: [...categories, remaining > 0 ? 'Remaining' : null].filter(Boolean),
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          ...categories.map((cat) => categoryColors[cat]),
          remaining > 0 ? '#10B981' : null, // Green-500 for Remaining
        ].filter(Boolean),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: $${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold text-gray-800">Budget Summary</h2>
      <p className="text-gray-600">Budget: ${budget.toFixed(2)}</p>
      <p className="text-gray-600">Spent: ${totalSpent.toFixed(2)}</p>
      <p className={`text-lg ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
        Remaining: ${remaining.toFixed(2)}
      </p>
      {remaining < 0 && (
        <p className="text-red-500 mt-2">Warning: You’ve exceeded your budget!</p>
      )}
      <div className="h-64 mt-4">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}