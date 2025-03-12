import React from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function MonthlySpending() {
  const { budget, transactions } = useBudgetStore();

  const totalSpent = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const remaining = budget - totalSpent;

  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date('2024-11-27');
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const dailySpending = dates.map((date) => {
    return transactions
      .filter((t) => t.type === 'expense' && t.date === date)
      .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  });

  const data = {
    labels: dates.map((d) => d.slice(8)),
    datasets: [
      {
        label: 'Spending',
        data: dailySpending,
        borderColor: '#F59E0B',
        backgroundColor: '#F59E0B',
        tension: 0.1,
        pointRadius: 0,
      },
      {
        label: 'Budget',
        data: Array(30).fill(budget / 30),
        borderColor: '#10B981',
        backgroundColor: '#10B981',
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, ticks: { color: '#D1D5DB' }, grid: { color: '#4B5563' } },
      x: { ticks: { color: '#D1D5DB' }, grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="p-4 bg-[#2A3550] rounded-lg shadow-md h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Monthly Spending</h2>
      <p className="text-2xl font-bold">
        ${totalSpent.toFixed(2)} <span className="text-sm font-normal">out of ${budget.toFixed(2)} budgeted</span>
      </p>
      <div className="flex-1 mt-4">
        <Line data={data} options={options} />
      </div>
      <p className={`text-sm mt-2 ${remaining < 0 ? 'text-red-400' : 'text-green-400'}`}>
        {remaining >= 0 ? `$${remaining.toFixed(2)} left` : `$${Math.abs(remaining).toFixed(2)} over`}
      </p>
    </div>
  );
}