import { CommonModule, KeyValue } from '@angular/common';
import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  inject,
  OnInit,
  StaticProvider,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CONTROL_DATA } from '../control-data.token';
import { DynamicControl } from '../dynamic-forms.model';
import { banWords } from 'src/app/validators/ban-words.validator';
import { DynamicValidatorMessage } from 'src/app/validators/dynamic-validator-message.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

export const comparatorFn = (
  a: KeyValue<string, DynamicControl>,
  b: KeyValue<string, DynamicControl>
): number => a.value.order - b.value.order;

export const sharedDynamicControlDeps = [
  CommonModule,
  ReactiveFormsModule,
  DynamicValidatorMessage,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSelectModule,
  MatRadioModule,
];

export const dynamicControlProvider: StaticProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Directive()
export class BaseDynamicControl implements OnInit {
  @HostBinding('class') hostClass = 'form-field';

  control = inject(CONTROL_DATA);

  formControl: AbstractControl = new FormControl(
    this.control.config.value,
    this.resolveValidators(this.control.config)
  );

  private parentGroupDir = inject(ControlContainer);

  ngOnInit() {
    (this.parentGroupDir.control as FormGroup).addControl(
      this.control.controlKey,
      this.formControl
    );
  }

  private resolveValidators({ validators = {} }: DynamicControl) {
    return (Object.keys(validators) as Array<keyof typeof validators>).map(
      (validatorKey) => {
        const validatorValue = validators[validatorKey];
        if (validatorKey === 'required') {
          return Validators.required;
        }
        if (validatorKey === 'email') {
          return Validators.email;
        }
        if (validatorKey === 'requiredTrue') {
          return Validators.requiredTrue;
        }
        if (
          validatorKey === 'minLength' &&
          typeof validatorValue === 'number'
        ) {
          return Validators.minLength(validatorValue);
        }
        if (validatorKey === 'banWords' && Array.isArray(validatorValue)) {
          return banWords(validatorValue);
        }
        return Validators.nullValidator;
      }
    );
  }
}
