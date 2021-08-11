import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerpaidComponent } from './customerpaid.component';

describe('CustomerpaidComponent', () => {
  let component: CustomerpaidComponent;
  let fixture: ComponentFixture<CustomerpaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerpaidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
