import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap, map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  URL = 'http://localhost:4201';
  private authSub = new BehaviorSubject<AuthData | null>(null);
  user$ = this.authSub.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.URL}/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSub.next(data);
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
    );
  }

  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  registration(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.URL}/register`, data);
  }

  restoreUser() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      return;
    }
    this.authSub.next(userData);
  }
}
