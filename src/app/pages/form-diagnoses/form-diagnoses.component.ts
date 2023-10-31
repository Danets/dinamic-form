import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form-diagnoses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './form-diagnoses.component.html',
  styleUrls: ['./form-diagnoses.component.scss'],
})
export class FormDiagnosesComponent implements OnInit {
  filterDate = (d: Date | null): boolean => {
    return d > new Date();
  };

  form: FormGroup;
  diagnoses$: Observable<any>;
  doctors$!: Observable<string[]>;
  formJSON;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.diagnoses$ = this.apiService.data$;
    this.doctors$ = this.apiService.doctors$.pipe(
      tap((doctors) => this.buildDoctors(doctors))
    );
  }

  private initForm() {
    this.form = new FormGroup({
      picker: new FormControl(''),
      doctors: new FormRecord<FormControl<boolean>>({}),
      isDiagnosExist: new FormControl('diagnosExist'),
      conditions: new FormArray([
        new FormGroup({
          diagnos: new FormControl(''),
          notes: new FormControl(''),
        }),
      ]),
    });
  }

  private buildDoctors(doctors: string[]) {
    doctors.forEach((doctor) => {
      (this.form.get('doctors') as FormGroup).addControl(
        doctor,
        new FormControl(false, { nonNullable: true })
      );
    });
  }

  // trackByDiagnosId(index: number, diagnos: any): number {
  //   return diagnos.id;
  // }

  get conditions(): FormArray {
    return this.form.controls['conditions'] as FormArray;
  }

  onAddDiagnos(): void {
    // this.conditions.push(
    //   new FormGroup({
    //     diagnos: new FormControl(''),
    //     notes: new FormControl(''),
    //   })
    // );
    this.conditions.insert(
      0,
      new FormGroup({
        diagnos: new FormControl(''),
        notes: new FormControl(''),
      })
    );
  }

  onRemoveDiagnos(idx: number): void {
    this.conditions.removeAt(idx);
  }

  onSubmit(): void {
    const arrConditions = this.form.value.conditions.map((condition) => ({
      id: 'f8525994-03ec-446e-83bf-4208c2f8aee3',
      context: {
        identifier: {
          type: {
            coding: [
              {
                system: 'eHealth/resources',
                code: 'encounter',
              },
            ],
          },
          value: condition.diagnos.id,
        },
      },
      code: {
        coding: [
          {
            system: 'eHealth/ICPC2/condition_codes',
            code: condition.diagnos.code,
          },
        ],
      },
      notes: condition.notes,
      onset_date: this.form.value.picker,
    }));

    this.formJSON = {
      encounter: {
        date: this.form.value.picker,
      },
      conditions: Object.values(this.form.value.conditions[0].diagnos).length
        ? arrConditions
        : [],
    };
  }
}
