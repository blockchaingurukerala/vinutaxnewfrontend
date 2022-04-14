import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCustomerDraftInvoiceComponent } from './display-customer-draft-invoice.component';

describe('DisplayCustomerDraftInvoiceComponent', () => {
  let component: DisplayCustomerDraftInvoiceComponent;
  let fixture: ComponentFixture<DisplayCustomerDraftInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCustomerDraftInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCustomerDraftInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
