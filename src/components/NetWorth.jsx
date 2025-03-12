import React from 'react';
import { useBudgetStore } from '../store/budgetStore';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function NetWorth() {
  const { transactions } = useBudgetStore();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
  const netWorth = totalIncome - totalExpenses;

  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date('2024-11-27');
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const netWorthData = dates.map((date) => {
    const incomeUpToDate = transactions
      .filter((t) => t.type === 'income' && new Date(t.date) <= new Date(date))
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    const expensesUpToDate = transactions
      .filter((t) => t.type === 'expense' && new Date(t.date) <= new Date(date))
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    return incomeUpToDate - expensesUpToDate;
  });

  const data = {
    labels: dates.map((d) => d.slice(8)),
    datasets: [
      {
        label: 'Net Worth',
        data: netWorthData,
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        tension: 0.1,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { ticks: { color: '#D1D5DB' }, grid: { color: '#4B5563' } },
      x: { ticks: { color: '#D1D5DB' }, grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="p-4 bg-[#2A3550] rounded-lg shadow-md h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Net Worth</h2>
      <p className="text-2xl font-bold">
        ${netWorth.toFixed(2)}{' '}
        <span className="text-sm font-normal text-green-400">
          {netWorth > 0 ? '↑' : '↓'} {((netWorth / 10000) * 100).toFixed(2)}%
        </span>
      </p>
      <div className="flex-1 mt-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}