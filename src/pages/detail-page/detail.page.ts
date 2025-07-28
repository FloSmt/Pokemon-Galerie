import {Component, OnInit} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {PokemonService} from '../../services/pokemon.service';

@Component({
  selector: 'app-detail-page',
  imports: [],
  templateUrl: './detail.page.html',
  styleUrl: './detail.page.scss'
})
export class DetailPage implements OnInit{

  constructor(private activatedRoute: ActivatedRoute, public pokemonService: PokemonService) {
  }
    ngOnInit(): void {
      const pokemonName = this.activatedRoute.snapshot.url[1].path;
      console.log(pokemonName);
    }


}

