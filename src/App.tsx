import React, { useState, useEffect } from 'react';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { TransactionStats } from './components/TransactionStats';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import { Wallet, Settings, Target } from 'lucide-react';
import { useSettings } from './hooks/useSettings';
import type { Transaction, User, Goal } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(!localStorage.getItem('user'));
  const settings = useSettings();

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const handleAddTransaction = (newTransaction: { 
    amount: number; 
    category: string; 
    description: string;
    type: 'expense' | 'income';
  }) => {
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      ...newTransaction
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal: Goal = {
      id: crypto.randomUUID(),
      ...newGoal
    };
    setGoals(prev => [...prev, goal]);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const handleLogin = (data: { email?: string; phone?: string; name: string }) => {
    setUser({
      id: crypto.randomUUID(),
      ...data
    });
    setIsAuthOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wallet className="text-blue-600" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Plan it</h1>
                <p className="text-sm text-gray-600">money management made easier</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <p className="text-gray-600">
                  Welcome, <span className="font-medium">{user.name}</span>
                </p>
              )}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Settings"
              >
                <Settings size={24} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {goals.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Target size={24} />
              <h2 className="text-xl font-semibold">Spending Goals</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {goals.map(goal => {
                const category = settings.categories.find(c => c.id === goal.category);
                const daysLeft = Math.ceil(
                  (new Date(goal.targetDate).getTime() - new Date().getTime()) / 
                  (1000 * 60 * 60 * 24)
                );
                
                return (
                  <div key={goal.id} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="font-medium text-lg mb-2">
                      {category?.name || 'Unknown Category'}
                    </h3>
                    <p className="text-2xl font-bold mb-1">
                      {settings.currency.symbol}{goal.amount.toFixed(2)}
                    </p>
                    <p className="text-sm opacity-90">
                      {daysLeft} days left to reach this goal
                    </p>
                    {goal.description && (
                      <p className="text-sm mt-2 opacity-75">{goal.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <TransactionForm 
              type="income"
              onAddTransaction={handleAddTransaction}
              categories={settings.categories}
              currency={settings.currency}
            />
            <TransactionForm 
              type="expense"
              onAddTransaction={handleAddTransaction}
              categories={settings.categories}
              currency={settings.currency}
            />
          </div>
          <div className="lg:col-span-2">
            <TransactionStats 
              transactions={transactions}
              currency={settings.currency}
              categories={settings.categories}
            />
            <TransactionList 
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              currency={settings.currency}
              categories={settings.categories}
            />
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onSkip={() => setIsAuthOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currency={settings.currency}
        language={settings.language}
        categories={settings.categories}
        goals={goals}
        onCurrencyChange={settings.updateCurrency}
        onLanguageChange={settings.updateLanguage}
        onAddCategory={settings.addCategory}
        onDeleteCategory={settings.deleteCategory}
        onAddGoal={handleAddGoal}
        onDeleteGoal={handleDeleteGoal}
      />
    </div>
  );
}

export default App;