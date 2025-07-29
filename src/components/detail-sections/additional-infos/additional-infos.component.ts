import {Component, input} from '@angular/core';
import {getTypeColor} from '../../../utils/enums/pokemonTypeColor';
import {Pokemon} from '../../../utils/interfaces/pokemon';
import {PokemonSpecies} from '../../../utils/interfaces/pokemonSpecies';

@Component({
  selector: 'app-additional-infos',
  imports: [],
  templateUrl: './additional-infos.component.html',
  styleUrl: './additional-infos.component.scss'
})
export class AdditionalInfosComponent {
  pokemon = input.required<Pokemon>();
  pokemonSpeciesDetails = input.required<PokemonSpecies>();

  protected readonly getTypeColor = getTypeColor;
}
