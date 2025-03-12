import React from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetSummary() {
  const { budget, expenses } = useBudgetStore();

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalSpent;

  const chartData = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        data: [totalSpent, remaining > 0 ? remaining : 0],
        backgroundColor: ['#EF4444', '#10B981'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
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