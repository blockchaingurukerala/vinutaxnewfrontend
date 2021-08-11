import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinvoicecustomerComponent } from './editinvoicecustomer.component';

describe('EditinvoicecustomerComponent', () => {
  let component: EditinvoicecustomerComponent;
  let fixture: ComponentFixture<EditinvoicecustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditinvoicecustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditinvoicecustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
