import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, PieChart } from 'lucide-react';
import type { Expense, CategoryTotal } from '../types';

interface ExpenseStatsProps {
  expenses: Expense[];
}

export const ExpenseStats: React.FC<ExpenseStatsProps> = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const categoryTotals = expenses.reduce((acc: CategoryTotal[], expense) => {
    const existingCategory = acc.find(cat => cat.category === expense.category);
    if (existingCategory) {
      existingCategory.total += expense.amount;
    } else {
      acc.push({ category: expense.category, total: expense.amount });
    }
    return acc;
  }, []);

  const averageExpense = expenses.length > 0 
    ? totalExpenses / expenses.length 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <DollarSign className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-800">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <TrendingUp className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Average Expense</p>
            <p className="text-2xl font-bold text-gray-800">
              ${averageExpense.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <PieChart className="text-purple-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Categories</p>
            <p className="text-2xl font-bold text-gray-800">
              {categoryTotals.length}
            </p>
          </div>
        </div>
      </div>

      {categoryTotals.length > 0 && (
        <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Expenses by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryTotals}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};