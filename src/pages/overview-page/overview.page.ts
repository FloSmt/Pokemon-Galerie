import {Component, OnInit, WritableSignal} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../utils/interfaces/pokemon';
import {PokemonCardComponent} from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-overview-page',
  imports: [
    PokemonCardComponent
  ],
  templateUrl: './overview.page.html',
  styleUrl: './overview.page.scss'
})
export class OverviewPage implements OnInit {

  constructor(public pokemonService: PokemonService) {
  }

  loadedPokemon!: WritableSignal<Pokemon[]>;

  ngOnInit() {
    this.loadedPokemon = this.pokemonService.loadedPokemon;

    if (this.pokemonService.currentPage() === 0) {
      this.loadPokemon();

    }
  }

  loadPokemon() {
    this.pokemonService.loadMultiplePokemon();
  }
}
