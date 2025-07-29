import {Component, input} from '@angular/core';
import {getTypeColor} from '../../utils/enums/pokemonTypeColor';
import {Pokemon} from '../../utils/interfaces/pokemon';

@Component({
  selector: 'app-additional-infos',
  imports: [],
  templateUrl: './additional-infos.component.html',
  styleUrl: './additional-infos.component.scss'
})
export class AdditionalInfosComponent {
  pokemon = input.required<Pokemon>();

  protected readonly getTypeColor = getTypeColor;
}
