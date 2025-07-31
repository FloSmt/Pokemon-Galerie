export const ResponseApiPokemonListMock = {
  count: 1302,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
      name: "charmander",
      url: "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
      name: "charmeleon",
      url: "https://pokeapi.co/api/v2/pokemon/5/"
    },
  ]
}


export const ResponseApiPokemonMock = {
  abilities: [
    {
      ability: {
        name: "overgrow",
        url: "ability-link"
      },
      is_hidden: false,
      slot: 1
    },
    {
      ability: {
        name: "chlorophyll",
        url: "ability-link"
      },
      is_hidden: true,
      slot: 3
    }
  ],
  base_experience: 64,
  height: 7,
  id: 1,
  is_default: true,
  name: "bulbasaur",
  order: 1,
  species: {
    name: "bulbasaur",
    url: "species-link"
  },
  sprites: {
    back_default: "back-default-link",
    front_default: "front-default-link",
    other: {
      'official-artwork': {
        front_default: "artwork-link",
      },
    }
  },
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/"
      }
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/"
      }
    },
    {
      base_stat: 49,
      effort: 0,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/"
      }
    },
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/"
      }
    },
    {
      base_stat: 65,
      effort: 0,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/"
      }
    },
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/"
      }
    }
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/"
      }
    },
    {
      slot: 2,
      type: {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/"
      }
    }
  ],
  weight: 69
}
