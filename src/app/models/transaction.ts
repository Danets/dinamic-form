export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export type AddTransaction = Omit<Transaction, 'id'>;
