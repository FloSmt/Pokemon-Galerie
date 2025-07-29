import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../utils/interfaces/pokemon';
import {StatsSectionComponent} from '../../components/detail-sections/stats-section/stats-section.component';
import {getTypeColor} from '../../utils/enums/pokemonTypeColor';
import {AdditionalInfosComponent} from '../../components/detail-sections/additional-infos/additional-infos.component';
import {catchError, of, switchMap} from 'rxjs';
import {EvolutionSectionComponent} from '../../components/detail-sections/evolution-section/evolution-section.component';
import {PokemonSpecies} from '../../utils/interfaces/pokemonSpecies';
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
  styleUrl: './detail.page.scss'
})
export class DetailPage implements OnInit{

  pokemon: Pokemon | undefined = undefined;
  pokemonSpeciesDetails: PokemonSpecies | undefined = undefined;
  isLoading = signal(false);

  constructor(private activatedRoute: ActivatedRoute, public pokemonService: PokemonService) {}

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
          this.pokemon = pokemon;
          return this.pokemonService.getSpeciesDetails(this.pokemon);
        }),
        catchError(() => {
          this.isLoading.set(false);
          return of(undefined);
        })
      ).subscribe((species) => {
        this.pokemonSpeciesDetails = species;
      });
    }
}

