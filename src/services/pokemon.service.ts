import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ListResult} from '../utils/interfaces/listResult';
import {Pokemon} from '../utils/interfaces/pokemon';
import {forkJoin, map, Observable, tap} from 'rxjs';

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
        map(data => data.results.map((pokemon: any) => this.getPokemonDetails(pokemon.name))),
        tap(() => this.isLoading.set(false))
      )
      .subscribe(requests => {
        forkJoin(requests).subscribe(pokemons => {
          this.loadedPokemon.update((current) => [...current, ...pokemons]);
        });
      });
  }
  private getPokemonDetails(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.API_URL}pokemon/${name}`).pipe(
      map((pokemon: any) => ({
        id: pokemon.id,
        name: pokemon.name,
        imgUrl: pokemon.sprites.front_default
      }))
    );
  }

}
