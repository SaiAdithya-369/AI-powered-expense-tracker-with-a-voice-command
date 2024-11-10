import React from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import type { Transaction, Currency, Category } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  currency: Currency;
  categories: Category[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onDeleteTransaction,
  currency,
  categories
}) => {
  const getCategoryName = (id: string) => {
    return categories.find(cat => cat.id === id)?.name || 'Unknown';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
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
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No transactions recorded yet
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {format(new Date(transaction.date), 'MMM d, yyyy')}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {transaction.description || '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {getCategoryName(transaction.category)}
                  </td>
                  <td className={`py-3 px-4 text-sm text-right ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {currency.symbol}{transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete transaction"
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