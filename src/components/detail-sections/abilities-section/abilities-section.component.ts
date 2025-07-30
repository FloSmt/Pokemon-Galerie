import {Component, input} from '@angular/core';
import {Pokemon} from '../../../utils/interfaces';

@Component({
  selector: 'app-abilities-section',
  imports: [],
  templateUrl: './abilities-section.component.html',
  standalone: true,
  styleUrl: './abilities-section.component.scss'
})
export class AbilitiesSectionComponent {
  pokemon = input.required<Pokemon>();

}
