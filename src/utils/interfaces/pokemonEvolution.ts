import {Pokemon} from './pokemon';

export interface PokemonEvolution {
  name: string;
  min_level: number | null;
  pokemon: Pokemon | null;
}
