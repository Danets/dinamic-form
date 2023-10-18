import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  formJSON;

  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    // this.diagnoses$ = this.apiService.getDiagnoses();
    this.diagnoses$ = this.apiService.data$;
  }

  private initForm() {
    this.form = new FormGroup({
      picker: new FormControl(''),
      conditions: new FormArray([
        new FormGroup({
          diagnos: new FormControl(''),
          notes: new FormControl(''),
        }),
      ]),
    });
  }

  // trackByDiagnosId(index: number, diagnos: any): number {
  //   return diagnos.id;
  // }

  get conditions(): FormArray {
    return this.form.controls['conditions'] as FormArray;
  }

  onAddDiagnos() {
    this.conditions.push(
      new FormGroup({
        diagnos: new FormControl(''),
        notes: new FormControl(''),
      })
    );
  }

  onSubmit(form: any) {
    const arrConditions = form.value.conditions.map((condition) => ({
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
      onset_date: form.value.picker,
    }));

    this.formJSON = {
      encounter: {
        date: form.value.picker,
      },
      conditions: Object.values(form.value.conditions[0].diagnos).length
        ? arrConditions
        : [],
    };
  }
}