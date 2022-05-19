import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../models/movies';

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
              (click)="onToggle(i)"
              [style.background-color]="clicked[i] ? 'red' : 'gray'"
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
    `,
  ],
})
export class MoviesComponent implements OnInit {
  movies: Movies[] = [];
  isLoading: boolean = true;

  // tracking Variable of Likes Buttons //
  clicked: { [key: number]: boolean } = {};

  constructor(private moviesService: MoviesService) {
    this.moviesService.getMovies().subscribe((data) => {
      this.movies = data;
      this.isLoading = false;
    });
  }

  onToggle(i: any) {
    this.clicked[i] = !this.clicked[i];
  }

  ngOnInit(): void {}
}
