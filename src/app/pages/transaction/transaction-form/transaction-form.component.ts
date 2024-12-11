import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

import { TransactionService } from '../transaction.service';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent implements OnInit {
  transactionForm: FormGroup;

  categories = ['Groceries', 'Salary', 'Entertainment', 'Travel', 'Others'];

  @ViewChild(FormGroupDirective)
  formdir!: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.nonNullable.group({
      name: this.fb.nonNullable.control('', Validators.required),
      amount: this.fb.nonNullable.control(null, [
        Validators.required,
        Validators.min(0.01),
      ]),
      type: this.fb.nonNullable.control('expense'),
      category: this.fb.nonNullable.control('', Validators.required),
      date: [new Date().toISOString().slice(0, 10), Validators.required],
    });
  }

  // Add a transaction
  addTransaction(): void {
    console.log({ form: this.transactionForm.value });
    if (this.transactionForm.valid) {
      const transaction: Transaction = {
        id: crypto.randomUUID(), // Generate a unique ID
        ...this.transactionForm.value,
      };
      this.transactionService.addTransaction(transaction);
      this.formdir.resetForm({});
    }
  }
}
