import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, PieChart } from 'lucide-react';
import type { Transaction, Currency, Category } from '../types';

interface TransactionStatsProps {
  transactions: Transaction[];
  currency: Currency;
  categories: Category[];
}

export const TransactionStats: React.FC<TransactionStatsProps> = ({ 
  transactions,
  currency,
  categories
}) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const categoryTotals = transactions.reduce((acc: any[], transaction) => {
    const categoryName = categories.find(cat => cat.id === transaction.category)?.name || 'Unknown';
    const existingCategory = acc.find(cat => cat.category === categoryName);
    const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;

    if (existingCategory) {
      existingCategory.total += amount;
    } else {
      acc.push({ category: categoryName, total: amount });
    }
    return acc;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <DollarSign className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Income</p>
            <p className="text-2xl font-bold text-gray-800">
              {currency.symbol}{totalIncome.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-full">
            <TrendingUp className="text-red-600" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-800">
              {currency.symbol}{totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${
            balance >= 0 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <PieChart className={balance >= 0 ? 'text-green-600' : 'text-red-600'} size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-600">Balance</p>
            <p className={`text-2xl font-bold ${
              balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {currency.symbol}{Math.abs(balance).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {categoryTotals.length > 0 && (
        <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transactions by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryTotals}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => `${currency.symbol}${Math.abs(value).toFixed(2)}`}
                />
                <Bar 
                  dataKey="total" 
                  fill="#3b82f6"
                  className="cursor-pointer"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};