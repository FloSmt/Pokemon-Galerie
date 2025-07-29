import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSectionComponent } from './training-section.component';

describe('TrainingSectionComponent', () => {
  let component: TrainingSectionComponent;
  let fixture: ComponentFixture<TrainingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
