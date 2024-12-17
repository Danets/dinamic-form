import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from './transaction.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TransactionListComponent, TransactionFormComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent implements OnInit {
  transactionService = inject(TransactionService);

  transactions$: Observable<Transaction[]>;

  ngOnInit(): void {
    this.transactions$ = this.transactionService.transactionsStream$;
  }
}
