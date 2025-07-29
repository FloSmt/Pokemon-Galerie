import {computed, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListResult} from '../utils/interfaces/listResult';
import {Pokemon} from '../utils/interfaces/pokemon';
import {forkJoin, map, Observable, of, switchMap, tap} from 'rxjs';
import {mapApiResponseToEvolutionChain, mapApiResponseToPokemon} from './helper';
import {PokemonEvolution} from '../utils/interfaces/pokemonEvolution';

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

  constructor(public http: HttpClient) {}


  loadMultiplePokemon() {
    this.isLoading.set(true);
    this.http.get<ListResult>(`${this.API_URL}pokemon?limit=${this.pageSize}&offset=${this.pageOffset()}`)
      .pipe(
        map(data => data.results.map((pokemon: any) => this.loadPokemonDetails(pokemon.name))),
      )
      .subscribe(requests => {
        forkJoin(requests).subscribe(pokemon => {
          this.addNewPokemon(pokemon)
          this.currentPage.set(this.currentPage() + 1);
          this.isLoading.set(false)
        });
      });
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

  getEvolutionChain(pokemon: Pokemon): Observable<PokemonEvolution[]> {
    return this.http.get<any>(pokemon.species?.url).pipe(
      map((speciesData: any) => speciesData.evolution_chain.url),
      switchMap((evolutionChainUrl: string) => this.http.get<any>(evolutionChainUrl)),
      map((evolutionChainData: any) => {
        const evolutionsChain = mapApiResponseToEvolutionChain(evolutionChainData);
        evolutionsChain.forEach((evolution: PokemonEvolution) => {
          this.getPokemonByName(evolution.species).subscribe((pokemon) => {
            evolution.pokemon = pokemon;
          })
        });

        return evolutionsChain;
      })
    )
  }


  private loadPokemonDetails(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_URL}pokemon/${nameOrId}`).pipe(
      map((pokemonData: any) => {
        console.log(pokemonData);
        const pokemon = mapApiResponseToPokemon(pokemonData);
        this.addNewPokemon([pokemon]);
        return pokemon;
      })
    );
  }

  private addNewPokemon(pokemon: Pokemon[]) {
    this.loadedPokemon.update((current) => {
      const existingNames = new Set(current.map(p => p.name));
      const newPokemon = pokemon.filter(p => !existingNames.has(p.name));
      return [...current, ...newPokemon].sort((a, b) => a.order - b.order);
    });
  }
}
