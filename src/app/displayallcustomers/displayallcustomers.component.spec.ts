import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayallcustomersComponent } from './displayallcustomers.component';

describe('DisplayallcustomersComponent', () => {
  let component: DisplayallcustomersComponent;
  let fixture: ComponentFixture<DisplayallcustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayallcustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayallcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
