import { Component } from '@angular/core';
import {
  BaseDynamicControl,
  dynamicControlProvider,
  sharedDynamicControlDeps,
} from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  imports: [...sharedDynamicControlDeps],
  viewProviders: [dynamicControlProvider],
  template: `
    <mat-label>{{ control.config.label }}</mat-label>
    <mat-select
      [formControlName]="control.controlKey"
      [id]="control.controlKey"
      [value]="control.config.value"
    >
      <mat-option
        *ngFor="let option of control.config.options"
        [value]="option.value"
        >{{ option.label }}</mat-option
      >
    </mat-select>
  `,
})
export class DynamicSelectComponent extends BaseDynamicControl {}
