import {Component, input} from '@angular/core';
import {Pokemon} from '../../../utils/interfaces/pokemon';

@Component({
  selector: 'app-abilities-section',
  imports: [],
  templateUrl: './abilities-section.component.html',
  styleUrl: './abilities-section.component.scss'
})
export class AbilitiesSectionComponent {
  pokemon = input.required<Pokemon>();

}
