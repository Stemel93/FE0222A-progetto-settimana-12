import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="container">
      <mat-card class="card">
        <mat-card-title class="mb">Login</mat-card-title>
        <mat-card-content>
          <form class="example-form" #form="ngForm" (ngSubmit)="onSubmit(form)">
            <mat-form-field
              class="example-full-width"
              appearance="fill"
              color="accent"
            >
              <mat-label>Email</mat-label>
              <input
                matInput
                placeholder="Inserisci Email..."
                type="email"
                ngModel
                name="email"
                required
              />
            </mat-form-field>

            <mat-form-field
              class="example-full-width"
              appearance="fill"
              color="accent"
            >
              <mat-label>Password</mat-label>
              <input
                matInput
                placeholder="Inserisci Password..."
                type="password"
                ngModel
                name="password"
                required
              />
            </mat-form-field>

            <mat-card-actions>
              <div class="center">
                <button
                  mat-raised-button
                  color="primary"
                  [disabled]="form.invalid"
                  type="submit"
                >
                  Accedi
                </button>
              </div>
            </mat-card-actions>
          </form>
        </mat-card-content>
        <mat-card-footer>
          <p>
            Non sei Registrato?
            <span class="ul" [routerLink]="'/register'">Registrati!</span>
          </p>
        </mat-card-footer>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #3f51b5;
      }
      .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 35em;
        height: 23em;
      }
      .example-form {
        min-width: 150px;
        max-width: 500px;
        width: 100%;
      }

      input {
        font-size: 20px;
      }

      .mat-label {
        font-size: 20px;
      }

      .example-full-width {
        width: 100%;
      }
      .mb {
        margin-bottom: 20px;
      }
      .ul {
        text-decoration: underline;
        cursor: pointer;
      }
      .center {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit(form: any) {
    console.log(form.value);
    await this.authService.login(form.value).toPromise();
    this.router.navigate(['/movies']);
  }

  ngOnInit(): void {}
}
