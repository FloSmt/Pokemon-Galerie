import {Pokemon} from '../utils/interfaces/pokemon';
import {PokemonEvolution} from '../utils/interfaces/pokemonEvolution';

export function mapApiResponseToPokemon(response: any): Pokemon {
  const pokemon: Pokemon = {
    id: response.id,
    name: response.name,
    order: response.order,
    sprites: {
      front_default: response.sprites.front_default,
      back_default: response.sprites.back_default,
      artwork: response.sprites.other?.['official-artwork']?.front_default
    },
    types: response.types.map((typeInfo: any) => typeInfo.type.name),
    height: response.height,
    weight: response.weight,
    species: {
      name: response.species.name,
      url: response.species.url
    },
    stats: response.stats.map((statInfo: any) => ({
        name: statInfo.stat.name,
        base_stat: statInfo.base_stat,
        effort: statInfo.effort
    })),
    abilities: response.abilities.map((abilityInfo: any) => ({
      id: abilityInfo.id,
      name: abilityInfo.ability.name,
      is_hidden: abilityInfo.is_hidden,
    }))
  };
  return pokemon;
}

export function mapApiResponseToEvolutionChain(response: any): PokemonEvolution[] {
  const evolutions: PokemonEvolution[] = [];
  function traverse(chainNode: any) {
    evolutions.push({
      species: chainNode.species.name,
      min_level: chainNode.evolution_details?.[0]?.min_level || null,
      pokemon: null
    });
    chainNode.evolves_to.forEach((evo: any) => traverse(evo));
  }
  traverse(response.chain);
  return evolutions;
}
