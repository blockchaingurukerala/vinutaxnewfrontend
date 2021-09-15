import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnallocatedMatchingComponent } from './unallocated-matching.component';

describe('UnallocatedMatchingComponent', () => {
  let component: UnallocatedMatchingComponent;
  let fixture: ComponentFixture<UnallocatedMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnallocatedMatchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnallocatedMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
