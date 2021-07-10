import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFromHMRCComponent } from './display-from-hmrc.component';

describe('DisplayFromHMRCComponent', () => {
  let component: DisplayFromHMRCComponent;
  let fixture: ComponentFixture<DisplayFromHMRCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayFromHMRCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFromHMRCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
