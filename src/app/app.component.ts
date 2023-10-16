import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormDiagnosesComponent } from './form-diagnoses/form-diagnoses.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormDiagnosesComponent],
  template: `<app-form-diagnoses></app-form-diagnoses>`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dinamic-form';
}
