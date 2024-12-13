import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TransactionListComponent, TransactionFormComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactions = this.transactionService.getTransactions();
  }
}
