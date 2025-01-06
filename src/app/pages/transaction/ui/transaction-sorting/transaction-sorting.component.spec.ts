import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSortingComponent } from './transaction-sorting.component';

describe('TransactionSortingComponent', () => {
  let component: TransactionSortingComponent;
  let fixture: ComponentFixture<TransactionSortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionSortingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
