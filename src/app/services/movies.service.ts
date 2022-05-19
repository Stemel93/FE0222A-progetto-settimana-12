import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movies } from '../models/movies';
import { AuthData, AuthService } from '../auth/services/auth.service';
import { Favorites } from '../models/favorites';
import { map, take } from 'rxjs';

export interface FavMovies {
  data: Movies;
  favId?: number;
  favIsLoading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  URL = 'http://localhost:4201/movies-popular';
  urlFav = 'http://localhost:4201/favorites';

  getMovies() {
    return this.http.get<[Movies]>(this.URL);
  }

  getFavourite(userId: number) {
    return this.http
      .get<Favorites[]>(this.urlFav)
      .pipe(
        map((favorites) =>
          favorites.filter((favorite) => favorite.userId == userId)
        )
      );
  }

  getSingleMovie(id: number) {
    return this.http.get<Movies>(this.URL + '/' + id);
  }

  // favourite //

  async addPref(userId: number, movieId: number) {
    const item = {
      movieId: movieId,
      userId: userId,
    };
    return this.http.post<Favorites>(`${this.urlFav}`, item);

    /*  const user: AuthData = (await this.authService.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    return this.http.post<Favorites>(`${this.authService.URL}/favorites`, {
      userId: user.user.id,
      movieId,
    }); */
  }
  removePref(id: number) {
    return this.http.delete(`${this.urlFav}/${id}`);
  }
}
