import {Component, input} from '@angular/core';
import {PokemonSpecies} from '../../../utils/interfaces/pokemonSpecies';

@Component({
  selector: 'app-breeding-section',
  imports: [],
  templateUrl: './breeding-section.component.html',
  styleUrl: './breeding-section.component.scss'
})
export class BreedingSectionComponent {
  pokemonSpeciesDetails = input.required<PokemonSpecies>();

  getGenderRate(gender: 'male' | 'female'): string {
    const genderRate = this.pokemonSpeciesDetails().gender_rate / 8;

    return gender === 'female'? genderRate * 100 + '%': (100 - genderRate * 100) + '%';
  }

  getEggGroups(): string {
    const eggGroups = this.pokemonSpeciesDetails().egg_groups;
    return eggGroups.length > 0 ? eggGroups.map(group => group).join(', ') : 'Unknown';
  }
}
