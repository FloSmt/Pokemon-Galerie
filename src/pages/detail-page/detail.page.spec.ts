import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailPage} from './detail.page';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;
  const pokemonServiceSpy = jasmine.createSpy('PokemonService');
  const activatedRouteSpy = jasmine.createSpy('ActivatedRoute');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPage],
      providers: [
        {provide: 'PokemonService', useValue: pokemonServiceSpy},
        {provide: 'ActivatedRoute', useValue: activatedRouteSpy}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
