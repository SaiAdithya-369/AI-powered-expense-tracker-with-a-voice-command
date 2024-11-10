import { useState, useEffect } from 'react';
import { Currency, Language, Category } from '../types';
import { 
  DEFAULT_CURRENCIES, 
  DEFAULT_LANGUAGES, 
  DEFAULT_EXPENSE_CATEGORIES,
  DEFAULT_INCOME_CATEGORIES 
} from '../config/constants';

interface Settings {
  currency: Currency;
  language: Language;
  categories: Category[];
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('settings');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currency: DEFAULT_CURRENCIES[0],
      language: DEFAULT_LANGUAGES[0],
      categories: [...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES],
    };
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const updateCurrency = (currency: Currency) => {
    setSettings(prev => ({ ...prev, currency }));
  };

  const updateLanguage = (language: Language) => {
    setSettings(prev => ({ ...prev, language }));
  };

  const addCategory = (name: string, type: 'expense' | 'income') => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name,
      type,
    };
    setSettings(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory],
    }));
  };

  const deleteCategory = (id: string) => {
    setSettings(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== id),
    }));
  };

  return {
    ...settings,
    updateCurrency,
    updateLanguage,
    addCategory,
    deleteCategory,
  };
};