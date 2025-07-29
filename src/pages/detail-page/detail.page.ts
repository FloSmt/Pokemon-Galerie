import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../utils/interfaces/pokemon';
import {StatsSectionComponent} from '../../components/stats-section/stats-section.component';
import {getTypeColor} from '../../utils/enums/pokemonTypeColor';
import {AdditionalInfosComponent} from '../../components/additional-infos/additional-infos.component';
import {catchError, of, switchMap} from 'rxjs';
import {EvolutionSectionComponent} from '../../components/evolution-section/evolution-section.component';

@Component({
  selector: 'app-detail-page',
  imports: [
    RouterLink,
    StatsSectionComponent,
    AdditionalInfosComponent,
    EvolutionSectionComponent,
  ],
  templateUrl: './detail.page.html',
  styleUrl: './detail.page.scss'
})
export class DetailPage implements OnInit{

  pokemon: Pokemon | undefined = undefined;
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

          if (selectedId) {
            return this.pokemonService.getPokemonById(selectedId);
          }else {
            return this.pokemonService.getPokemonByName(selectedName!);
          }
        }),
        catchError(() => {
          this.isLoading.set(false);
          return of(undefined);
        })
      ).subscribe(pokemon => {
        this.pokemon = pokemon;
        this.isLoading.set(false);
      });
    }
}

