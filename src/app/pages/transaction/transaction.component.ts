import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { TransactionFilterComponent } from './ui/transaction-filter/transaction-filter.component';
import { TransactionFormComponent } from './ui/transaction-form/transaction-form.component';
import { TransactionListComponent } from './ui/transaction-list/transaction-list.component';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from './data-access/transaction.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    TransactionFilterComponent,
    TransactionListComponent,
    TransactionFormComponent,
  ],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  private filterTypeSubject = new BehaviorSubject<string>('all');
  private sortBySubject = new BehaviorSubject<string>('date');

  private transactionService = inject(TransactionService);

  transactions$: Observable<Transaction[]> =
    this.transactionService.transactionsStream$;

  filteredTransactions$: Observable<Transaction[]>;
  balance$ = this.transactionService.balance$;

  ngOnInit(): void {
    this.settingTransactions();
  }

  private settingTransactions() {
    this.filteredTransactions$ = combineLatest([
      this.transactions$,
      this.filterTypeSubject,
      this.sortBySubject,
    ]).pipe(
      map(([transactions, filterType, sortBy]) =>
        this.filterAndSortTransactions(transactions, filterType, sortBy)
      )
    );
  }

  private filterAndSortTransactions(
    transactions: Transaction[],
    filterType: string,
    sortBy: string
  ): Transaction[] {
    let filteredTransactions = transactions;

    if (filterType !== 'all') {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.type === filterType
      );
    }

    return filteredTransactions.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return a.amount - b.amount;
    });
  }

  onChangeFilter(filterType: string): void {
    this.filterTypeSubject.next(filterType);
  }

  onChangeSort(sortBy: string): void {
    this.sortBySubject.next(sortBy);
  }
}
