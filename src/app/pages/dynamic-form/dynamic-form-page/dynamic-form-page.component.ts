import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DynamicFormConfig } from '../dynamic-forms.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicControlResolver } from '../dynamic-control-resolver.service';
import { ControlInjectorPipe } from '../control-injector.pipe';
import { comparatorFn } from '../dynamic-controls/base-dynamic-control';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dynamic-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlInjectorPipe,
    MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatCheckboxModule,
    // MatSelectModule,
    // MatRadioModule,
  ],
  templateUrl: './dynamic-form-page.component.html',
  styleUrls: ['./dynamic-form-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormPageComponent implements OnInit {
  protected comparatorFn = comparatorFn;

  protected formLoadingTrigger = new Subject<'user' | 'company'>();
  protected formConfig$!: Observable<{
    form: FormGroup;
    config: DynamicFormConfig;
  }>;

  constructor(
    private http: HttpClient,
    protected controlResolver: DynamicControlResolver
  ) {}

  ngOnInit(): void {
    this.formConfig$ = this.formLoadingTrigger.pipe(
      switchMap((config) =>
        this.http.get<DynamicFormConfig>(`assets/${config}.form.json`)
      ),
      map((config) => ({
        config,
        form: new FormGroup({}),
      }))
    );
  }
  protected onSubmit(form: FormGroup) {
    console.log('Submitted data: ', form.value);
    form.reset();
  }
}
