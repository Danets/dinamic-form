import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search = new FormControl('');

  private searchSubject = new Subject<string>();
  subject$ = this.searchSubject.asObservable();

  result$: Observable<string>;

  constructor() {
    this.result$ = this.subject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchText) => {
        return of(`Result for "${searchText}"`);
      })
    );
  }

  onSearch() {
    this.searchSubject.next(this.search.value);
  }
}
