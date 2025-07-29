import {Pokemon} from '../utils/interfaces/pokemon';

export function mapApiResponseToPokemon(response: any): Pokemon {
  console.log('Mapping API response to Pokemon:', response);
  const pokemon: Pokemon = {
    id: response.id,
    name: response.name,
    sprites: {
      front_default: response.sprites.front_default,
      back_default: response.sprites.back_default,
      artwork: response.sprites.other?.['official-artwork']?.front_default
    },
    types: response.types.map((typeInfo: any) => typeInfo.type.name),
    height: response.height,
    weight: response.weight,
    stats: response.stats.map((statInfo: any) => ({
        name: statInfo.stat.name,
        base_stat: statInfo.base_stat,
        effort: statInfo.effort
    })),
  };
  console.log('Mapped Pokemon:', pokemon);
  return pokemon;
}
