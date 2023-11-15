import { Component } from '@angular/core';
import {
  BaseDynamicControl,
  dynamicControlProvider,
  sharedDynamicControlDeps,
} from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [...sharedDynamicControlDeps],
  viewProviders: [dynamicControlProvider],
  template: `
    <mat-label>{{ control.config.label }}</mat-label>
    <input
      matInput
      [formControlName]="control.controlKey"
      [value]="control.config.value"
      [type]="control.config.type"
    />
  `,
})
export class DynamicInputComponent extends BaseDynamicControl {}
