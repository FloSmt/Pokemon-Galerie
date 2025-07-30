import {Component, input} from '@angular/core';
import {Pokemon} from '../../utils/interfaces';
import {getTypeColor} from '../../utils/enums/pokemonTypeColor';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './pokemon-card.component.html',
  standalone: true,
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
  protected readonly getTypeColor = getTypeColor;

  getPokemonOrder(): string {
    return this.pokemon().id.toString().padStart(4, '0');
  }
}
