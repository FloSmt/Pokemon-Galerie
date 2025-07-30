import {TestBed} from '@angular/core/testing';

import {PokemonService} from './pokemon.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {MappingService} from './mapping.service';

describe('Pokemon', () => {
  let service: PokemonService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  const mappingServiceSpy = jasmine.createSpyObj('MappingService', ['mapApiResponseToPokemon']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: MappingService, useValue: mappingServiceSpy},
      ]
    });
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadPokemonDetails', () => {
    it('should load a Pokemon from the Api', () => {
      const pokemonMock = {name: 'Pokemon', order: 1} as any;
      const mappedPokemonMock = {name: 'mappedPokemon', order: 1} as any;

      httpClientSpy.get.and.returnValue(of({status: 200, data: {pokemonMock}}));
      mappingServiceSpy.mapApiResponseToPokemon.and.returnValue(mappedPokemonMock);

      const addNewPokemonSpy = spyOn(service, 'addNewPokemon').and.callThrough();

      service.loadPokemonDetails('pokemon1').subscribe((result) => {
        expect(httpClientSpy.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pokemon1');
        expect(addNewPokemonSpy).toHaveBeenCalledWith([mappedPokemonMock]);
        expect(result).toEqual(mappedPokemonMock);
      });
    });
  });

  describe('addNewPokemon', () => {
    beforeEach(() => {
      service.loadedPokemon.set([
        {name: 'pokemon1', order: 1} as any,
        {name: 'pokemon2', order: 2} as any,
      ])
    });
    it('should add new Pokemon that doesnt exist', () => {
      service.addNewPokemon([
        {name: 'pokemon3', order: 3} as any
      ]);
      const result = service.loadedPokemon();
      expect(result.some(p => p.name === 'pokemon3')).toBeTrue();
      expect(result.length).toBe(3);
    });

    it('should not add already existing pokemon', () => {
      service.addNewPokemon([
        {name: 'pokemon2', order: 2} as any
      ]);
      const result = service.loadedPokemon();
      expect(result.filter(p => p.name === 'pokemon2').length).toBe(1);
      expect(result.length).toBe(2);
    });

    it('should sort the list by order', () => {
      service.addNewPokemon([
        {name: 'pokemon0', order: 0} as any
      ]);
      const result = service.loadedPokemon();
      expect(result[0].name).toBe('pokemon0');
      expect(result[1].name).toBe('pokemon1');
      expect(result[2].name).toBe('pokemon2');
    });
  })
});
