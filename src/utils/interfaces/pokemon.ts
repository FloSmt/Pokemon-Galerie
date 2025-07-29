import {PokemonStat} from './pokemonStat';
import {Ability} from './ability';

export interface Pokemon {
  id: number;
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

}
