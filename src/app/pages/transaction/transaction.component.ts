import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { TransactionFilterComponent } from './transaction-filter/transaction-filter.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { Transaction } from 'src/app/models/transaction';
import { TransactionService } from './transaction.service';

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
  private transactionService = inject(TransactionService);

  transactions$: Observable<Transaction[]> =
    this.transactionService.transactionsStream$;

  private filterTypeSubject = new BehaviorSubject<string>('all');
  private sortBySubject = new BehaviorSubject<string>('date');

  filteredTransactions$: Observable<Transaction[]>;

  ngOnInit(): void {
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

  onChangeFilter(filterType: string) {
    this.filterTypeSubject.next(filterType);
  }

  onChangeSort(sortBy: string) {
    this.sortBySubject.next(sortBy);
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
}
