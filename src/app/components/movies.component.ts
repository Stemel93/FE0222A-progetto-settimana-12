import { Component, OnInit } from '@angular/core';
import { FavMovies, MoviesService } from '../services/movies.service';
import { Movies } from '../models/movies';
import { Favorites } from '../models/favorites';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  template: `
    <ng-container *ngIf="isLoading; else elsePage"
      ><mat-spinner color="accent"></mat-spinner
    ></ng-container>

    <ng-template #elsePage>
      <div fxLayout="row wrap" fxLayoutGap="25px">
        <mat-card
          class="example-card"
          *ngFor="let movie of movies; let i = index"
        >
          <mat-card-header>
            <mat-card-title
              >Valutazione: {{ movie.vote_average }}
              <mat-icon class="prova">grade</mat-icon>
              <span>Voti: {{ movie.vote_count }} </span>
            </mat-card-title>

            <!-- <mat-card-subtitle>
              Valutazione: {{ movie.vote_average }}
            </mat-card-subtitle> -->
          </mat-card-header>
          <img
            mat-card-image
            src="https://image.tmdb.org/t/p/w500{{ movie.poster_path }}"
            alt="Cover of {{ movie.title }}"
          />

          <mat-card-actions>
            <button
              mat-mini-fab
              class="btn-like"
              id="{{ movie.id }}"
              (click)="toggleClass(movie.id, i, movie)"
              [className]="
                clicked[i]
                  ? 'mat-focus-indicator btn-like mat-mini-fab mat-button-base mat-accent reddone'
                  : 'mat-focus-indicator btn-like mat-mini-fab mat-button-base mat-accent'
              "
            >
              <mat-icon>favorite</mat-icon>
            </button>

            <button
              mat-raised-button
              color="primary"
              [routerLink]="['/movies', movie.id]"
            >
              DETTAGLI
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .btn-like {
        background-color: grey;
      }
      span {
        font-size: 15px;
      }
      .mat-spinner {
        margin: 20% auto;
      }
      .mat-card {
        width: 20em;
        margin-top: 1em;
      }

      .prova {
        font-size: 0.8em;
      }

      .reddone {
        background-color: red;
      }
    `,
  ],
})
export class MoviesComponent implements OnInit {
  movies: Movies[] = [];
  isLoading: boolean = true;
  getFav: Favorites[] = [];
  sub!: Subscription;
  userId!: number;

  // tracking Variable of Likes Buttons //
  clicked: { [key: number]: boolean } = {};

  constructor(
    private moviesService: MoviesService,
    private authService: AuthService
  ) {
    this.moviesService.getMovies().subscribe((data) => {
      this.movies = data;
      this.isLoading = false;
    });
  }

  toggleClass(idMovie: any, i: number, movies: Movies) {
    const elementClass = document.getElementById(`${idMovie}`);
    if (elementClass?.classList.contains('reddone') === true) {
      elementClass.classList.remove('reddone');
      this.removeFav(movies);
    } else {
      elementClass?.classList.add('reddone');
      this.addFav(movies);
    }
  }

  onToggle(i: any) {
    this.clicked[i] = !this.clicked[i];
  }

  async addFav(movie: Movies) {
    this.sub = (
      await this.moviesService.addPref(this.userId, movie.id)
    ).subscribe((data) => {
      this.getFav.push(data);
      console.log(this.getFav);
    });
  }

  getFavorites(userId: number) {
    this.sub = this.moviesService.getFavourite(userId).subscribe((data) => {
      this.getFav = data;
      console.log(this.getFav);
    });
  }

  checkFavorites() {}

  async removeFav(movie: Movies) {
    const favorite = this.getFav.find(
      (favorite) => favorite.movieId == movie.id
    );
    this.getFav = this.getFav.filter((fav) => fav !== favorite);
    if (!favorite) {
      return;
    }
    this.sub = this.moviesService.removePref(favorite.id).subscribe();
  }

  colorFav(userId: number) {
    /* this.userId = JSON.parse(localStorage.getItem('user') || '');

    console.log(this.userId.user.id); */

    this.moviesService.getFavourite(userId).subscribe((fav) => {
      this.getFav = fav;
      const userPippo = userId;

      const prova = this.getFav.filter(function (el) {
        return el.userId === userPippo;
      });

      console.log(prova);

      for (let index = 0; index < prova.length; index++) {
        console.log(prova[index].movieId);
        const styleChange = document.getElementById(`${prova[index].movieId}`);
        if (styleChange !== null) {
          styleChange.classList.add('reddone');
        }
      }
    });
  }

  ngOnInit(): void {
    this.sub = this.authService.user$.subscribe((data) => {
      if (!data) {
        return;
      }
      this.userId = data.user.id;
    });

    this.getFavorites(this.userId);
    this.colorFav(this.userId);
  }
}
