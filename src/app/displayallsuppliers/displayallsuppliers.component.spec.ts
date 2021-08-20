import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayallsuppliersComponent } from './displayallsuppliers.component';

describe('DisplayallsuppliersComponent', () => {
  let component: DisplayallsuppliersComponent;
  let fixture: ComponentFixture<DisplayallsuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayallsuppliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayallsuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
