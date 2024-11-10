import React, { useState } from 'react';
import { X, Plus, Target } from 'lucide-react';
import { Currency, Language, Category, Goal } from '../types';
import { DEFAULT_CURRENCIES, DEFAULT_LANGUAGES } from '../config/constants';
import { GoalForm } from './GoalForm';
import { GoalsList } from './GoalsList';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  language: Language;
  categories: Category[];
  goals: Goal[];
  onCurrencyChange: (currency: Currency) => void;
  onLanguageChange: (language: Language) => void;
  onAddCategory: (name: string, type: 'expense' | 'income') => void;
  onDeleteCategory: (id: string) => void;
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onDeleteGoal: (id: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currency,
  language,
  categories,
  goals,
  onCurrencyChange,
  onLanguageChange,
  onAddCategory,
  onDeleteCategory,
  onAddGoal,
  onDeleteGoal,
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState<'expense' | 'income'>('expense');
  const [showGoalForm, setShowGoalForm] = useState(false);

  if (!isOpen) return null;

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim(), newCategoryType);
      setNewCategoryName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Spending Goals</h3>
            <div className="space-y-4">
              {showGoalForm ? (
                <GoalForm
                  onAddGoal={onAddGoal}
                  categories={categories}
                  currency={currency}
                  onClose={() => setShowGoalForm(false)}
                />
              ) : (
                <button
                  onClick={() => setShowGoalForm(true)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Target size={20} />
                  Add New Goal
                </button>
              )}
              <GoalsList
                goals={goals}
                onDeleteGoal={onDeleteGoal}
                currency={currency}
                categories={categories}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={currency.code}
              onChange={(e) => {
                const selected = DEFAULT_CURRENCIES.find(c => c.code === e.target.value);
                if (selected) onCurrencyChange(selected);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {DEFAULT_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={language.code}
              onChange={(e) => {
                const selected = DEFAULT_LANGUAGES.find(l => l.code === e.target.value);
                if (selected) onLanguageChange(selected);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {DEFAULT_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Categories</h3>
            <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <select
                value={newCategoryType}
                onChange={(e) => setNewCategoryType(e.target.value as 'expense' | 'income')}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
              </button>
            </form>

            <div className="space-y-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{category.name}</span>
                    <span className={`ml-2 text-sm ${
                      category.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ({category.type})
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};