import {TestBed} from '@angular/core/testing';

import {MappingService} from './mapping.service';
import {
  ExpectedMappingResponseForEvolutionChainMock,
  ExpectedMappingResponseForPokemonDetailsMock,
  ExpectedMappingResponseForSpeciesMock,
  ResponseApiEvolutionChainMock,
  ResponseApiPokemonMock,
  ResponseApiPokemonSpeciesMock
} from '../utils/mocks';

describe('Mapping', () => {
  let service: MappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map the API-Response to Pokemon', () => {
    const mappedResponse = service.mapApiResponseToPokemon(ResponseApiPokemonMock);
    expect(mappedResponse).toBeDefined();
    expect(mappedResponse).toEqual(ExpectedMappingResponseForPokemonDetailsMock);
  });

  it('should map the API-Response to Pokemon-chain', () => {
    const mappedResponse = service.mapApiResponseToEvolutionChain(ResponseApiEvolutionChainMock);
    expect(mappedResponse).toBeDefined();
    expect(mappedResponse).toEqual(ExpectedMappingResponseForEvolutionChainMock);
  });

  it('should map the API-Response to Pokemon-species', () => {
    const mappedResponse = service.mapApiResponeToPokemonSpecies(ResponseApiPokemonSpeciesMock);
    expect(mappedResponse).toBeDefined();
    expect(mappedResponse).toEqual(ExpectedMappingResponseForSpeciesMock);
  });
});
