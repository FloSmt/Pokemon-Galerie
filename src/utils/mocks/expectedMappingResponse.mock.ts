import {Pokemon, PokemonEvolution, PokemonSpecies} from '../interfaces';

export const ExpectedMappingResponseForPokemonDetailsMock: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  order: 1,
  base_experience: 64,
  sprites: {
    front_default: 'front-default-link',
    back_default: 'back-default-link',
    artwork: 'artwork-link',
  },
  types: ['grass', 'poison'],
  height: 7,
  weight: 69,
  species: {
    name: 'bulbasaur',
    url: 'species-link'
  },
  stats: [
    {
      name: 'hp',
      base_stat: 45,
      effort: 0
    },
    {
      name: 'attack',
      base_stat: 49,
      effort: 0
    },
    {
      name: 'defense',
      base_stat: 49,
      effort: 0
    },
    {
      name: 'special-attack',
      base_stat: 65,
      effort: 1
    },
    {
      name: 'special-defense',
      base_stat: 65,
      effort: 0
    },
    {
      name: 'speed',
      base_stat: 45,
      effort: 0
    },
  ],
  abilities: [
    {
      name: 'overgrow',
      is_hidden: false
    },
    {
      name: 'chlorophyll',
      is_hidden: true
    }
  ]
}


export const ExpectedMappingResponseForEvolutionChainMock: PokemonEvolution[] = [
  {
    name: 'rattata',
    min_level: null,
    pokemon: null,
  },
  {
    name: 'raticate',
    min_level: 20,
    pokemon: null
  }
]


export const ExpectedMappingResponseForSpeciesMock: PokemonSpecies = {
  gender_rate: 8,
  evolution_chain: 'evolution-chain-link',
  catch_rate: 45,
  base_happiness: 70,
  growth_rate: 'medium',
  egg_groups: ['bug'],
  habitat: null,
  color: 'gray',
  genera: 'Bagworm',
}
