import React from 'react';
import BudgetForm from './components/BudgetForm';
import ExpenseForm from './components/ExpenseForm'; // Reverted
import ExpenseList from './components/ExpenseList'; // Reverted
import BudgetSummary from './components/BudgetSummary';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Personal Budget Planner</h1>
        <p className="text-gray-600">Plan and track your monthly spending</p>
      </header>
      <main className="max-w-4xl mx-auto">
        <BudgetForm />
        <ExpenseForm />
        <BudgetSummary />
        <ExpenseList />
      </main>
    </div>
  );
}