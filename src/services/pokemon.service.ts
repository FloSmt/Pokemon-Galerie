import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListResult} from '../utils/interfaces/listResult';
import {Pokemon} from '../utils/interfaces/pokemon';
import {forkJoin, map, Observable, of, tap} from 'rxjs';
import {mapApiResponseToPokemon} from './helper';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public isLoading = signal(false);
  public loadedPokemon = signal<Pokemon[]>([]);

  readonly API_URL = 'https://pokeapi.co/api/v2/';

  constructor(public http: HttpClient) {}


  loadMultiplePokemon(limit: number = 20, offset: number = this.loadedPokemon().length) {
    this.isLoading.set(true);
    this.http.get<ListResult>(`${this.API_URL}pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        map(data => data.results.map((pokemon: any) => this.loadPokemonDetails(pokemon.name))),
        tap(() => this.isLoading.set(false))
      )
      .subscribe(requests => {
        forkJoin(requests).subscribe(pokemons => {
          this.loadedPokemon.update((current) => [...current, ...pokemons]);
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


  private loadPokemonDetails(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_URL}pokemon/${nameOrId}`).pipe(
      map((pokemon: any) => {
        //console.log(pokemon);
        return mapApiResponseToPokemon(pokemon);
      })
    );
  }

}
