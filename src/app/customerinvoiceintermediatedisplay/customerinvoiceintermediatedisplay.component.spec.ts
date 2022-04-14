import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerinvoiceintermediatedisplayComponent } from './customerinvoiceintermediatedisplay.component';

describe('CustomerinvoiceintermediatedisplayComponent', () => {
  let component: CustomerinvoiceintermediatedisplayComponent;
  let fixture: ComponentFixture<CustomerinvoiceintermediatedisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerinvoiceintermediatedisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerinvoiceintermediatedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
