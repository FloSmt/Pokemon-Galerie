import {Pokemon} from './pokemon';

export interface PokemonEvolution {
  species: string;
  min_level: number | null;
  pokemon: Pokemon | null;
}
