export interface PokemonSpecies {
  gender_rate: number;
  growth_rate: string;
  evolution_chain: string;
  base_happiness: number;
  catch_rate: number;
  egg_groups: string[];
  habitat: string | null;
  color: string;
  genera: string;
}
