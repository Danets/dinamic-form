import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-sorting',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-sorting.component.html',
  styleUrl: './transaction-sorting.component.scss',
})
export class TransactionSortingComponent {
  sortBy = 'date';

  @Output()
  sorted: EventEmitter<string> = new EventEmitter<string>();

  onChangeSort(sortBy: string) {
    this.sortBy = sortBy;
    this.sorted.emit(this.sortBy);
  }
}
