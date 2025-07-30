import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EvolutionSectionComponent} from './evolution-section.component';

describe('EvolutionSection', () => {
  let component: EvolutionSectionComponent;
  let fixture: ComponentFixture<EvolutionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvolutionSectionComponent],
      providers: []
    })
      .compileComponents();

    fixture = TestBed.createComponent(EvolutionSectionComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pokemon', {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
