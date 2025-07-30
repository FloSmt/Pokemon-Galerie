import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BreedingSectionComponent} from './breeding-section.component';

describe('BreedingSectionComponent', () => {
  let component: BreedingSectionComponent;
  let fixture: ComponentFixture<BreedingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedingSectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BreedingSectionComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pokemonSpeciesDetails', {egg_groups: []});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
