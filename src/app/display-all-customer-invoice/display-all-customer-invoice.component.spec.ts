import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllCustomerInvoiceComponent } from './display-all-customer-invoice.component';

describe('DisplayAllCustomerInvoiceComponent', () => {
  let component: DisplayAllCustomerInvoiceComponent;
  let fixture: ComponentFixture<DisplayAllCustomerInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAllCustomerInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllCustomerInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
