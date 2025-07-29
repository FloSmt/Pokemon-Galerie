import {PokemonStat} from './pokemonStat';
import {Ability} from './ability';
import {PokemonSpecies} from './pokemonSpecies';

export interface Pokemon {
  id: number;
  order: number;
  base_experience: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    artwork?: string;
  };
  types: string[];
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: Ability[];
  species: {
    name: string;
    url: string;
    details?: PokemonSpecies
  }

}
