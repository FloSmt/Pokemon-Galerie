import {Component, input} from '@angular/core';
import {Pokemon} from '../../utils/interfaces/pokemon';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
}
