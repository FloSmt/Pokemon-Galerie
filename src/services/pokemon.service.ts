import {computed, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListResult, Pokemon, PokemonEvolution, PokemonSpecies} from '../utils/interfaces';
import {forkJoin, map, Observable, of, switchMap, tap} from 'rxjs';
import {MappingService} from './mapping.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public isLoading = signal(false);
  public loadedPokemon = signal<Pokemon[]>([]);

  pageSize = 20;
  currentPage = signal(0);
  private pageOffset = computed(() => (this.currentPage() * this.pageSize));

  readonly API_URL = 'https://pokeapi.co/api/v2/';

  constructor(public http: HttpClient, public mappingService: MappingService) {
  }


  loadMultiplePokemon(): Observable<Pokemon[]> {
    this.isLoading.set(true);
    return this.http.get<ListResult>(`${this.API_URL}pokemon?limit=${this.pageSize}&offset=${this.pageOffset()}`)
      .pipe(
        switchMap(pokemonList => {
          if (pokemonList.results.length === 0) {
            return [];
          }

          const details: Observable<Pokemon>[] = pokemonList.results.map((pokemonResult) => this.loadPokemonDetails(pokemonResult.name));
          return forkJoin(details);
        }),
        tap(pokemon => {
          this.addNewPokemon(pokemon);
          this.currentPage.set(this.currentPage() + 1);
          this.isLoading.set(false)
        })
      )
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    const pokemon = this.loadedPokemon().find(p => p.name === name);
    if (pokemon) {
      return of(pokemon);
    } else {
      return this.loadPokemonDetails(name);
    }
  }

  getPokemonById(id: number): Observable<Pokemon> {
    const pokemon = this.loadedPokemon().find(p => p.id === id);
    if (pokemon) {
      return of(pokemon);
    } else {
      return this.loadPokemonDetails(id);
    }
  }

  getSpeciesDetails(pokemon: Pokemon): Observable<PokemonSpecies> {
    if (pokemon.species.details) {
      return of(pokemon.species.details);
    } else {
      // TODO: add loaded Species-data to existing pokemon in the list
      return this.http.get<PokemonSpecies>(pokemon.species.url).pipe(
        map((speciesData: any) => this.mappingService.mapApiResponeToPokemonSpecies(speciesData))
      );
    }
  }

  getEvolutionChain(pokemon: Pokemon): Observable<PokemonEvolution[]> {
    return this.getSpeciesDetails(pokemon).pipe(
      map((speciesData: any) => speciesData.evolution_chain),
      switchMap((evolutionChainUrl: string) => this.http.get<any>(evolutionChainUrl)),
      map((evolutionChainData: any) => {
        const evolutionsChain = this.mappingService.mapApiResponseToEvolutionChain(evolutionChainData);
        evolutionsChain.forEach((evolution: PokemonEvolution) => {
          this.getPokemonByName(evolution.name).subscribe((pokemon) => {
            evolution.pokemon = pokemon;
          })
        });

        return evolutionsChain;
      })
    )
  }


  loadPokemonDetails(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_URL}pokemon/${nameOrId}`).pipe(
      map((pokemonData) => {
        const pokemon = this.mappingService.mapApiResponseToPokemon(pokemonData);
        this.addNewPokemon([pokemon]);
        return pokemon;
      })
    );
  }

  addNewPokemon(pokemon: Pokemon[]) {
    this.loadedPokemon.update((current) => {
      const existingNames = new Set(current.map(p => p.name));
      const newPokemon = pokemon.filter(p => !existingNames.has(p.name));
      return [...current, ...newPokemon].sort((a, b) => a.order - b.order);
    });
  }
}
