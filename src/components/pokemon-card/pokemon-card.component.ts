import {Component, input} from '@angular/core';
import {Pokemon} from '../../utils/interfaces/pokemon';
import {getTypeColor } from '../../utils/enums/pokemonTypeColor';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    RouterLink
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
  protected readonly getTypeColor = getTypeColor;
}
