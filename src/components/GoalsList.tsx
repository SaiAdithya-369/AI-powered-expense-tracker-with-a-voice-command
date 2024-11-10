import React from 'react';
import { format } from 'date-fns';
import { Target, Trash2 } from 'lucide-react';
import type { Goal, Currency, Category } from '../types';

interface GoalsListProps {
  goals: Goal[];
  onDeleteGoal: (id: string) => void;
  currency: Currency;
  categories: Category[];
}

export const GoalsList: React.FC<GoalsListProps> = ({
  goals,
  onDeleteGoal,
  currency,
  categories,
}) => {
  const getCategoryName = (id: string) => {
    return categories.find((cat) => cat.id === id)?.name || 'Unknown';
  };

  if (goals.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        No spending goals set yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {getCategoryName(goal.category)}
                </h3>
                <p className="text-sm text-gray-500">
                  Target: {currency.symbol}
                  {goal.amount.toFixed(2)} by{' '}
                  {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                </p>
                {goal.description && (
                  <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => onDeleteGoal(goal.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
              title="Delete goal"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};