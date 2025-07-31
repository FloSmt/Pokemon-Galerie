import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon, PokemonSpecies} from '../../utils/interfaces';
import {StatsSectionComponent} from '../../components/detail-sections/stats-section/stats-section.component';

import {AdditionalInfosComponent} from '../../components/detail-sections/additional-infos/additional-infos.component';
import {catchError, of, switchMap, tap} from 'rxjs';
import {
  EvolutionSectionComponent
} from '../../components/detail-sections/evolution-section/evolution-section.component';
import {BreedingSectionComponent} from '../../components/detail-sections/breeding-section/breeding-section.component';
import {TrainingSectionComponent} from '../../components/detail-sections/training-section/training-section.component';
import {
  AbilitiesSectionComponent
} from '../../components/detail-sections/abilities-section/abilities-section.component';

@Component({
  selector: 'app-detail-page',
  imports: [
    RouterLink,
    StatsSectionComponent,
    AdditionalInfosComponent,
    EvolutionSectionComponent,
    BreedingSectionComponent,
    TrainingSectionComponent,
    AbilitiesSectionComponent,
  ],
  templateUrl: './detail.page.html',
  standalone: true,
  styleUrl: './detail.page.scss'
})
export class DetailPage implements OnInit {

  pokemon: WritableSignal<Pokemon | undefined> = signal(undefined);
  pokemonSpeciesDetails: WritableSignal<PokemonSpecies | undefined> = signal(undefined);
  isLoading = signal(false);

  constructor(private activatedRoute: ActivatedRoute, public pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.getSpecificPokemonFromUrl();
  }

  getSpecificPokemonFromUrl() {
    this.isLoading.set(true);
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const selectedId = Number(params.get('id'));
        const selectedName = params.get('name');

        return selectedId ?
          this.pokemonService.getPokemonById(selectedId) :
          this.pokemonService.getPokemonByName(selectedName!);
      }),
      switchMap(pokemon => {
        if (!pokemon) {
          this.isLoading.set(false);
          return of(undefined);
        }

        this.pokemon.set(pokemon);
        return this.pokemonService.getSpeciesDetails(pokemon)
          .pipe(
            tap((pokemonSpecies) => {
              this.pokemonSpeciesDetails.set(pokemonSpecies);
            })
          );
      }),
      catchError(() => {
        this.isLoading.set(false);
        return of(undefined);
      })
    ).subscribe();
  }
}

