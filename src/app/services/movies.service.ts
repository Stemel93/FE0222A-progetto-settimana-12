import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../models/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  URL = 'http://localhost:4201/movies-popular';

  getMovies() {
    return this.http.get<[Movies]>(this.URL);
  }

  getSingleMovie(id: number) {
    return this.http.get<Movies>(this.URL + '/' + id);
  }
}
