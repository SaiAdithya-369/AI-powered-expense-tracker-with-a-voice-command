import React from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import type { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Expenses</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Description</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No expenses recorded yet
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {format(new Date(expense.date), 'MMM d, yyyy')}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {expense.description || '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {expense.category}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 text-right">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete expense"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};