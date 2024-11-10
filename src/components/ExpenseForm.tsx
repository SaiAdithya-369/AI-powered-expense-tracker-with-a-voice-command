import React, { useState } from 'react';
import { Mic, Plus } from 'lucide-react';
import { useVoiceCommand } from '../hooks/useVoiceCommand';

interface ExpenseFormProps {
  onAddExpense: (expense: { amount: number; category: string; description: string }) => void;
}

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Others'
];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');

  const handleVoiceCommand = (text: string) => {
    const amountMatch = text.match(/\d+/);
    if (amountMatch) {
      setAmount(amountMatch[0]);
      const descriptionWithoutAmount = text.replace(/\d+/, '').trim();
      setDescription(descriptionWithoutAmount);
      
      // Try to match category
      const matchedCategory = categories.find(cat => 
        text.toLowerCase().includes(cat.toLowerCase())
      );
      if (matchedCategory) {
        setCategory(matchedCategory);
      }
    }
  };

  const { isListening, startListening } = useVoiceCommand(handleVoiceCommand);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAddExpense({
      amount: parseFloat(amount),
      category,
      description
    });

    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Add Expense</h2>
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
            Amount ($)
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
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add Expense
        </button>
      </div>
    </form>
  );
};