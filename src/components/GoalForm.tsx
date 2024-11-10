import React, { useState } from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import type { Category, Currency } from '../types';

interface GoalFormProps {
  onAddGoal: (goal: {
    category: string;
    amount: number;
    targetDate: string;
    description?: string;
  }) => void;
  categories: Category[];
  currency: Currency;
  onClose: () => void;
}

export const GoalForm: React.FC<GoalFormProps> = ({
  onAddGoal,
  categories,
  currency,
  onClose,
}) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount || !targetDate) return;

    onAddGoal({
      category,
      amount: parseFloat(amount),
      targetDate,
      description: description.trim() || undefined,
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Select a category</option>
          {categories
            .filter((cat) => cat.type === 'expense')
            .map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Amount ({currency.symbol})
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign size={16} className="text-gray-400" />
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Date
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar size={16} className="text-gray-400" />
          </div>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Add a note about your goal..."
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Set Goal
        </button>
      </div>
    </form>
  );
};