import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatRadioModule],
  templateUrl: './transaction-filter.component.html',
  styleUrl: './transaction-filter.component.scss',
})
export class TransactionFilterComponent {
  filterType = 'all';
  sortBy = 'date';

  @Output()
  changedFilter: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  sorted: EventEmitter<string> = new EventEmitter<string>();

  onChangeFilter(filter: string) {
    this.filterType = filter;
    this.changedFilter.emit(this.filterType);
  }

  onChangeSort(sortBy: string) {
    this.sortBy = sortBy;
    this.sorted.emit(this.sortBy);
  }
}
