import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../models/movies';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  template: `
    <ng-container *ngIf="isLoading; else elsePage"
      ><mat-spinner color="accent"></mat-spinner
    ></ng-container>

    <ng-template #elsePage>
      <div class="container">
        <mat-card
          class="example-card"
          layout="row"
          layout-align="center center"
        >
          <mat-card-header>
            <mat-card-title>{{ movieSelected.title }}</mat-card-title>
          </mat-card-header>
          <img
            mat-card-image
            src="https://image.tmdb.org/t/p/w500{{
              movieSelected.backdrop_path
            }}"
            alt="Cover of {{ movieSelected.title }}"
          />
          <mat-card-content>
            <mat-card-subtitle
              >Titolo Originale:
              {{ movieSelected.original_title }}</mat-card-subtitle
            >
            <p class="releaseDate">
              Data di uscita: {{ movieSelected.release_date }}
            </p>
            <p>
              {{ movieSelected.overview }}
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" (click)="back()">
              Indietro
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .mat-spinner {
        margin: 20% auto;
      }
      .content {
        background: black !important;
      }

      img {
        max-height: 400px;
        background-size: cover;
      }
      p {
        font-size: 20px;
      }

      .releaseDate {
        font-weight: bold;
      }

      .mat-card-header {
        display: flex;
        justify-content: center;
      }

      .mat-card-subtitle {
        font-size: 18px;
      }

      .example-card {
        max-width: 50%;
      }

      .container {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class MovieCardComponent implements OnInit {
  movieId!: number;
  movieSelected!: Movies;
  isLoading: boolean = true;

  constructor(
    private movieService: MoviesService,
    private snapRoute: ActivatedRoute,
    private location: Location
  ) {}

  back() {
    this.location.back();
  }

  ngOnInit(): void {
    this.movieId = this.snapRoute.snapshot.params['id'];
    this.movieService.getSingleMovie(this.movieId).subscribe((response) => {
      this.movieSelected = response;
      this.isLoading = false;
    });
  }
}
