import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllSupplierInvoiceComponent } from './display-all-supplier-invoice.component';

describe('DisplayAllSupplierInvoiceComponent', () => {
  let component: DisplayAllSupplierInvoiceComponent;
  let fixture: ComponentFixture<DisplayAllSupplierInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAllSupplierInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllSupplierInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
