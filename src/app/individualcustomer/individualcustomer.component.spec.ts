import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualcustomerComponent } from './individualcustomer.component';

describe('IndividualcustomerComponent', () => {
  let component: IndividualcustomerComponent;
  let fixture: ComponentFixture<IndividualcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualcustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
