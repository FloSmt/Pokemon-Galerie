import {Component, input, OnInit, signal, WritableSignal} from '@angular/core';
import {PokemonService} from '../../../services/pokemon.service';
import {Pokemon, PokemonEvolution} from '../../../utils/interfaces';
import {PokemonCardComponent} from '../../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-evolution-section',
  imports: [
    PokemonCardComponent
  ],
  templateUrl: './evolution-section.component.html',
  standalone: true,
  styleUrl: './evolution-section.component.scss'
})
export class EvolutionSectionComponent implements OnInit {

  pokemon = input.required<Pokemon>();
  evolution: WritableSignal<PokemonEvolution[] | undefined> = signal(undefined);

  constructor(public pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.loadEvolutionChain();
  }

  loadEvolutionChain() {
    this.pokemonService.getEvolutionChain(this.pokemon()).subscribe({
      next: (evolutionChain) => {
        this.evolution.set(evolutionChain);
      },
      error: (error) => {
        console.error('Error loading evolution chain:', error);
      }
    });
  }

}
