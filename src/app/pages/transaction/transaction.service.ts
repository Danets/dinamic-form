import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private storageKey = 'transactions';

  constructor() {}

  // Get transactions from localStorage
  getTransactions(): Transaction[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save transactions to localStorage
  saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(transactions));
  }

  // Add a transaction
  addTransaction(transaction: Transaction): void {
    let transactions = this.getTransactions();
    transactions = [...transactions, transaction];
    this.saveTransactions(transactions);
  }

  // Remove a transaction
  removeTransaction(id: string): void {
    let transactions = this.getTransactions();
    transactions = transactions.filter((transaction) => transaction.id !== id);
    this.saveTransactions(transactions);
  }
}
