import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualjournalComponent } from './individualjournal.component';

describe('IndividualjournalComponent', () => {
  let component: IndividualjournalComponent;
  let fixture: ComponentFixture<IndividualjournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualjournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualjournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
