import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayjournalsComponent } from './displayjournals.component';

describe('DisplayjournalsComponent', () => {
  let component: DisplayjournalsComponent;
  let fixture: ComponentFixture<DisplayjournalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayjournalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayjournalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
