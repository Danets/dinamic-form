import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from 'src/app/models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private storageKey = 'transactions';

  //state
  private transactions$ = new BehaviorSubject<Transaction[]>([]);
  transactionsStream$ = this.transactions$.asObservable();

  constructor() {
    this.getTransactions();
  }

  // Get transactions from localStorage
  getTransactions(): Transaction[] {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      const transactions = JSON.parse(data);
      this.transactions$.next(transactions);
      return transactions;
    } else {
      return [];
    }
  }

  // Save transactions to localStorage
  saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(transactions));
    this.transactions$.next(transactions);
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
