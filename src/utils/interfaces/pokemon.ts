import {PokemonStat} from './pokemonStat';

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

}
