import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AbilitiesSectionComponent} from './abilities-section.component';

describe('AbilitiesSectionComponent', () => {
  let component: AbilitiesSectionComponent;
  let fixture: ComponentFixture<AbilitiesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbilitiesSectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AbilitiesSectionComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('pokemon', {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
