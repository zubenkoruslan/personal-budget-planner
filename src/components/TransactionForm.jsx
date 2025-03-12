import React, { useState } from 'react';
import { useBudgetStore } from '../store/budgetStore';

export default function TransactionForm() {
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { addTransaction } = useBudgetStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;
    addTransaction(type, type === 'income' ? '' : category, parseFloat(amount), date, category === 'misc' ? description : '');
    setAmount('');
    setDescription('');
  };

  const categories = [
    { label: 'Food', value: 'food', color: 'bg-green-500' },
    { label: 'Drink', value: 'drink', color: 'bg-blue-500' },
    { label: 'Travel', value: 'travel', color: 'bg-purple-500' },
    { label: 'Groceries', value: 'groceries', color: 'bg-yellow-500' },
    { label: 'Shopping', value: 'shopping', color: 'bg-orange-500' },
    { label: 'Misc', value: 'misc', color: 'bg-gray-500' },
  ];

  return (
    <div className="p-4 bg-[#2A3550] rounded-lg shadow-md h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            if (e.target.value === 'income') setCategory('');
          }}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={type === 'income'}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {category === 'misc' && type === 'expense' && (
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (e.g., Netflix)"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
          />
        )}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}