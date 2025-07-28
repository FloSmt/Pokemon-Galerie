import {Component, input} from '@angular/core';
import {Pokemon} from '../../utils/interfaces/pokemon';
import {PokemonTypeColor} from '../../utils/enums/pokemonTypeColor';
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

  getTypeColor(type: string): string {
    return PokemonTypeColor[type as keyof typeof PokemonTypeColor] || PokemonTypeColor.normal;
  }
}
