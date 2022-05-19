import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <mat-toolbar class="mat-elevation-z8">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon *ngIf="!sidenav.opened"> menu </mat-icon>
        <mat-icon *ngIf="sidenav.opened"> close </mat-icon>
      </button>
      <div class="title">Next( )D-Flix Movies</div>
    </mat-toolbar>

    <mat-sidenav-container>
      <mat-sidenav #sidenav="matSidenav" class="mat-elevation-z8">
        <img
          class="avatar mat-elevation-z8"
          src="https://source.unsplash.com/c_GmwfHBDzk/200x200"
        />

        <h4 class="name">John Smith</h4>
        <p class="designation">Software Engineer</p>

        <mat-divider></mat-divider>

        <button mat-button class="menu-button" routerLink="/movies">
          <mat-icon>home</mat-icon>
          <span>Home</span>
        </button>
        <button mat-button class="menu-button" routerLink="/profile">
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-button class="menu-button" routerLink="/about">
          <mat-icon>info</mat-icon>
          <span>About</span>
        </button>

        <mat-divider></mat-divider>

        <button mat-button class="menu-button" (click)="logOff()">
          <mat-icon>settings_power</mat-icon>
          <span>Logout</span>
        </button>
      </mat-sidenav>
      <mat-sidenav-content>
        <div class="content mat-elevation-z8">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .title {
        margin: 0 auto;
      }
      mat-toolbar {
        background: #004a9f;
        color: white;
      }

      mat-sidenav {
        margin: 16px;
        width: 200px;
        border-right: none;
        background: #002b5c;
        color: white;
        border-radius: 10px;
        padding: 16px;
        text-align: center;
      }

      .content {
        height: calc(100vh - 130px);
        border-radius: 10px;
        margin: 16px;
        margin-left: 32px;

        padding: 16px;

        overflow: auto;
      }

      mat-sidenav-container {
        height: calc(100vh - 65px);
      }

      .menu-button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1rem;

        mat-icon {
          margin-right: 8px;
        }
      }

      .avatar {
        margin-top: 16px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }

      .name {
        margin-top: 8px;
        font-weight: normal;
      }

      .designation {
        margin-top: 2px;
        font-size: 0.7rem;
        color: lightgrey;
      }

      mat-divider {
        margin-top: 16px;
        margin-bottom: 16px;
        background-color: rgba(255, 255, 255, 0.5);
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {}

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  ngOnInit(): void {}

  logOff() {
    this.authService.logout();
  }
}
