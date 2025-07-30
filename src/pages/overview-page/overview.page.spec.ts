import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OverviewPage} from './overview.page';

describe('OverviewPage', () => {
  let component: OverviewPage;
  const pokemonServiceSpy = jasmine.createSpy('PokemonService');
  let fixture: ComponentFixture<OverviewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewPage],
      providers: [
        {provide: 'PokemonService', useValue: pokemonServiceSpy}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
