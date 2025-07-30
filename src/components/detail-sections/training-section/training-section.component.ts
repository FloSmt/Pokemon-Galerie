import {Component, input} from '@angular/core';
import {Pokemon, PokemonSpecies} from '../../../utils/interfaces';

@Component({
  selector: 'app-training-section',
  imports: [],
  templateUrl: './training-section.component.html',
  standalone: true,
  styleUrl: './training-section.component.scss'
})
export class TrainingSectionComponent {
  pokemon = input.required<Pokemon>();
  pokemonSpeciesDetails = input.required<PokemonSpecies>();
}
