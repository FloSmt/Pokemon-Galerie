import {Component, input} from '@angular/core';
import {PokemonSpecies} from '../../../utils/interfaces/pokemonSpecies';
import {Pokemon} from '../../../utils/interfaces/pokemon';

@Component({
  selector: 'app-training-section',
  imports: [],
  templateUrl: './training-section.component.html',
  styleUrl: './training-section.component.scss'
})
export class TrainingSectionComponent {
  pokemon = input.required<Pokemon>();
  pokemonSpeciesDetails = input.required<PokemonSpecies>();
}
