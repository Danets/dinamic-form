import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../api.service';
import {
  Observable,
  Subject,
  bufferCount,
  distinctUntilChanged,
  filter,
  startWith,
  take,
  takeUntil,
  tap,
} from 'rxjs';
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
import { passwordMatching } from 'src/app/validators/password-matching.validator';
import { NicknameAsyncValidator } from 'src/app/validators/nickname.async.validator';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDiagnosesComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private nicknameAsyncValidator = inject(NicknameAsyncValidator);
  private destroyed$ = new Subject<void>();

  form: FormGroup;
  diagnoses$: Observable<any>;
  doctors$!: Observable<string[]>;
  formJSON;
  years = this.getYears();

  filterDate = (d: Date | null): boolean => {
    return d > new Date();
  };

  ngOnInit(): void {
    this.initForm();
    this.validateNotes();
    this.validatePassport();
    this.changeStatusForm();
    this.diagnoses$ = this.apiService.data$;
    this.doctors$ = this.apiService.doctors$.pipe(
      tap((doctors: string[]) => this.buildDoctors(doctors))
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initForm() {
    this.form = this.fb.group({
      picker: [''],
      nickName: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern(/^[\w.]+$/),
          ],
          asyncValidators: [
            this.nicknameAsyncValidator.validate.bind(
              this.nicknameAsyncValidator
            ),
          ],
          updateOn: 'blur',
        },
      ],
      passwordGroupe: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          passwordConfirmed: [''],
        },
        { validators: passwordMatching }
      ),
      doctors: this.fb.record<FormControl<boolean>>({}),
      passportGroupe: this.fb.group({
        years: this.fb.nonNullable.control(this.years[this.years.length - 1]),
        passport: ['', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]],
      }),
      isDiagnosExist: ['diagnosExist'],
      conditions: this.fb.array([
        this.fb.group({
          diagnos: this.fb.control(''),
          notes: this.fb.control(''),
        }),
      ]),
    });
  }

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  private buildDoctors(doctors: string[]) {
    doctors.forEach((doctor) => {
      (this.form.get('doctors') as FormGroup).addControl(
        doctor,
        new FormControl(false, { nonNullable: true })
      );
    });
  }

  private changeStatusForm() {
    this.form.statusChanges
      .pipe(
        bufferCount(2, 1),
        filter(([prevState]) => prevState === 'PENDING'),
        takeUntil(this.destroyed$)
      )
      .subscribe(() => this.cdr.markForCheck());
  }

  private validatePassport() {
    this.passportGroupe.controls.years.valueChanges
      .pipe(
        tap(() => {
          this.passportGroupe.controls.passport.markAsDirty();
          this.passportGroupe.controls.passport.markAsTouched();
        }),
        startWith(this.passportGroupe.controls.years.value),
        takeUntil(this.destroyed$)
      )
      .subscribe((years) => {
        const passport = this.passportGroupe.controls.passport;
        this.isAdult(years)
          ? passport.addValidators(Validators.required)
          : passport.removeValidators(Validators.required);
        passport.updateValueAndValidity();
      });
  }

  private isAdult(yearOfBirth: number): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth >= 18;
  }

  private validateNotes() {
    this.conditions.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((conditions: any[]) => {
        conditions.forEach((condition, index) => {
          const notes = this.conditions.at(index).get('notes');
          if (condition.diagnos) {
            notes?.markAsDirty();
            notes?.markAsTouched();
            notes?.setValidators([Validators.required]);
          } else {
            notes?.clearValidators();
          }
          notes?.updateValueAndValidity({ emitEvent: false });
        });
      });
  }
  /**
   * In this method occured RangeError: Maximum call stack size exceeded due to called updateValueAndValidity() without flag { emitEvent: false }
   */

  get conditions(): FormArray {
    return this.form.controls['conditions'] as FormArray;
  }

  get passportGroupe(): FormGroup {
    return this.form.controls.passportGroupe as FormGroup;
  }

  get passwordGroupe(): FormGroup {
    return this.form.controls.passwordGroupe as FormGroup;
  }

  onAddDiagnos(): void {
    this.conditions.push(
      new FormGroup({
        diagnos: new FormControl(''),
        notes: new FormControl(''),
      })
    );
    // this.conditions.insert(
    //   0,
    //   new FormGroup({
    //     diagnos: new FormControl(''),
    //     notes: new FormControl(''),
    //   })
    // );
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
