import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDiagnosesComponent } from './form-diagnoses.component';

describe('FormDiagnosesComponent', () => {
  let component: FormDiagnosesComponent;
  let fixture: ComponentFixture<FormDiagnosesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDiagnosesComponent]
    });
    fixture = TestBed.createComponent(FormDiagnosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
