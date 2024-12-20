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

  private balanceSubject = new BehaviorSubject<number>(0);
  balance$ = this.balanceSubject.asObservable();

  constructor() {
    this.getTransactions();
    this.getBalance();
  }

  private getBalance(): void {
    const transactions = this.getTransactions();
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'expense'
        ? acc - transaction.amount
        : acc + transaction.amount;
    }, 0);
    this.balanceSubject.next(balance);
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
    this.getBalance();
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
