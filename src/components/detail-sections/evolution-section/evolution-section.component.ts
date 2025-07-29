import {Component, input, OnInit} from '@angular/core';
import {PokemonService} from '../../../services/pokemon.service';
import {Pokemon} from '../../../utils/interfaces/pokemon';
import {PokemonEvolution} from '../../../utils/interfaces/pokemonEvolution';
import {RouterLink} from '@angular/router';
import {PokemonCardComponent} from '../../pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-evolution-section',
  imports: [
    RouterLink,
    PokemonCardComponent
  ],
  templateUrl: './evolution-section.component.html',
  styleUrl: './evolution-section.component.scss'
})
export class EvolutionSectionComponent implements OnInit{

  pokemon = input.required<Pokemon>();
  evolution: PokemonEvolution[] | undefined = undefined;

  constructor(public pokemonService: PokemonService) {
  }

    ngOnInit(): void {
        this.loadEvolutionChain();
    }

    loadEvolutionChain() {
        this.pokemonService.getEvolutionChain(this.pokemon()).subscribe({
            next: (evolutionChain) => {
                this.evolution = evolutionChain;
            },
            error: (error) => {
                console.error('Error loading evolution chain:', error);
            }
        });
    }

}
