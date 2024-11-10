export const DEFAULT_CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

export const DEFAULT_LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
];

export const DEFAULT_EXPENSE_CATEGORIES: Category[] = [
  { id: '1', name: 'Food & Dining', type: 'expense' },
  { id: '2', name: 'Transportation', type: 'expense' },
  { id: '3', name: 'Shopping', type: 'expense' },
  { id: '4', name: 'Entertainment', type: 'expense' },
  { id: '5', name: 'Bills & Utilities', type: 'expense' },
  { id: '6', name: 'Others', type: 'expense' },
];

export const DEFAULT_INCOME_CATEGORIES: Category[] = [
  { id: '7', name: 'Salary', type: 'income' },
  { id: '8', name: 'Freelance', type: 'income' },
  { id: '9', name: 'Investments', type: 'income' },
  { id: '10', name: 'Others', type: 'income' },
];