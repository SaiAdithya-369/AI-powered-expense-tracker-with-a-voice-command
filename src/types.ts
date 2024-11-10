export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'expense' | 'income';
}

export interface CategoryTotal {
  category: string;
  total: number;
}

export interface Category {
  id: string;
  name: string;
  type: 'expense' | 'income';
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface Goal {
  id: string;
  category: string;
  amount: number;
  targetDate: string;
  description?: string;
}