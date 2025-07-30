import {Component, input} from '@angular/core';
import {Pokemon, PokemonStat} from '../../../utils/interfaces';

@Component({
  selector: 'app-stats-section',
  imports: [],
  templateUrl: './stats-section.component.html',
  standalone: true,
  styleUrl: './stats-section.component.scss'
})
export class StatsSectionComponent {
  pokemon = input.required<Pokemon>();

  getBarColor(stat: PokemonStat): string {
    const baseStat = stat.base_stat;
    if (baseStat < 25) {
      return 'red';
    } else if (baseStat < 50) {
      return 'darkorange';
    } else if (baseStat < 75) {
      return 'orange';
    } else if (baseStat < 85) {
      return 'lightgreen';
    } else if (baseStat <= 100) {
      return 'green';
    } else {
      return 'darkgreen';
    }
  }

}
