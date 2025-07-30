import {Injectable} from '@angular/core';
import {Pokemon, PokemonEvolution, PokemonSpecies} from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MappingService {
  mapApiResponseToPokemon(response: any): Pokemon {
    return {
      id: response.id,
      name: response.name,
      order: response.order,
      base_experience: response.base_experience,
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
        name: abilityInfo.ability.name,
        is_hidden: abilityInfo.is_hidden,
      }))
    };
  }

  mapApiResponseToEvolutionChain(response: any): PokemonEvolution[] {
    const evolutions: PokemonEvolution[] = [];

    function traverse(chainNode: any) {
      evolutions.push({
        name: chainNode.species.name,
        min_level: chainNode.evolution_details?.[0]?.min_level || null,
        pokemon: null
      });
      chainNode.evolves_to.forEach((evo: any) => traverse(evo));
    }

    traverse(response.chain);
    return evolutions;
  }

  mapApiResponeToPokemonSpecies(response: any): PokemonSpecies {
    return {
      gender_rate: response.gender_rate,
      evolution_chain: response.evolution_chain.url,
      catch_rate: response.capture_rate,
      base_happiness: response.base_happiness,
      growth_rate: response.growth_rate.name,
      egg_groups: response.egg_groups.map((group: any) => group.name),
      habitat: response.habitat ? response.habitat.name : null,
      color: response.color.name,
      genera: response.genera.find((g: any) => g.language.name === 'en')?.genus || '',
    };
  }
}
