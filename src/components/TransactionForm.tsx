import React, { useState } from 'react';
import { Mic, Plus } from 'lucide-react';
import { useVoiceCommand } from '../hooks/useVoiceCommand';
import { Category, Currency } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: { 
    amount: number; 
    category: string; 
    description: string;
    type: 'expense' | 'income';
  }) => void;
  categories: Category[];
  currency: Currency;
  type: 'expense' | 'income';
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ 
  onAddTransaction, 
  categories,
  currency,
  type 
}) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const filteredCategories = categories.filter(cat => cat.type === type);

  const handleVoiceCommand = (text: string) => {
    const amountMatch = text.match(/\d+/);
    if (amountMatch) {
      setAmount(amountMatch[0]);
      const descriptionWithoutAmount = text.replace(/\d+/, '').trim();
      setDescription(descriptionWithoutAmount);
      
      const matchedCategory = filteredCategories.find(cat => 
        text.toLowerCase().includes(cat.name.toLowerCase())
      );
      if (matchedCategory) {
        setCategory(matchedCategory.id);
      }
    }
  };

  const { isListening, startListening } = useVoiceCommand(handleVoiceCommand);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAddTransaction({
      amount: parseFloat(amount),
      category,
      description,
      type
    });

    setAmount('');
    setDescription('');
    setCategory(filteredCategories[0]?.id || '');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Add {type === 'income' ? 'Income' : 'Expense'}
        </h2>
        <button
          type="button"
          onClick={startListening}
          className={`p-2 rounded-full ${
            isListening ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          } hover:opacity-80 transition-opacity`}
          title="Voice Command"
        >
          <Mic size={20} />
        </button>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount ({currency.symbol})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {filteredCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter description"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white flex items-center justify-center gap-2 ${
            type === 'income' 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
        >
          <Plus size={20} />
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </div>
    </form>
  );
};