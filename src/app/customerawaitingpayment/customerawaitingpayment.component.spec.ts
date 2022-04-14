import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerawaitingpaymentComponent } from './customerawaitingpayment.component';

describe('CustomerawaitingpaymentComponent', () => {
  let component: CustomerawaitingpaymentComponent;
  let fixture: ComponentFixture<CustomerawaitingpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerawaitingpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerawaitingpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
