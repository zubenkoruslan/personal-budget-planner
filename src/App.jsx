import React from 'react';
import TransactionForm from './components/TransactionForm';
import BudgetForm from './components/BudgetForm';
import MonthlySpending from './components/MonthlySpending';
import NetWorth from './components/NetWorth';
import Categories from './components/Categories';
import ExpenseIncomeBreakdown from './components/ExpenseIncomeBreakdown';

export default function App() {
  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* 1st Row: Forms side by side on desktop */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="w-full lg:w-1/2">
          <TransactionForm />
        </div>
        <div className="w-full lg:w-1/2">
          <BudgetForm />
        </div>
      </div>
      {/* 2nd Row: MonthlySpending, NetWorth */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        <div className="col-span-1">
          <MonthlySpending />
        </div>
        <div className="col-span-1">
          <NetWorth />
        </div>
      </div>
      {/* 3rd Row: Categories next to ExpenseIncomeBreakdown on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <Categories />
        </div>
        <div className="col-span-1">
          <ExpenseIncomeBreakdown />
        </div>
      </div>
    </div>
  );
}