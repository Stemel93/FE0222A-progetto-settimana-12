import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <div class="container">
      <mat-card>
        <mat-card-content label="Info">
          <div class="info" *ngIf="user$ | async as user">
            <p>Nome: {{ user.user.name }}</p>
            <p>Email: {{ user.user.email }}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      mat-card {
        width: 100%;
      }
      .info {
        font-size: 22px;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  user$ = this.authService.user$;

  ngOnInit(): void {}
}
