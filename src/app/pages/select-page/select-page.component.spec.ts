import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPageComponent } from './select-page.component';

describe('SelectPageComponent', () => {
  let component: SelectPageComponent;
  let fixture: ComponentFixture<SelectPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectPageComponent]
    });
    fixture = TestBed.createComponent(SelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
