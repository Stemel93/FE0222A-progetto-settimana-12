import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="container">
      <mat-card class="card">
        <mat-card-title class="mb">Registrati</mat-card-title>
        <mat-card-content>
          <form class="example-form" #form="ngForm" (ngSubmit)="onsubmit(form)">
            <mat-form-field
              class="example-full-width"
              appearance="fill"
              color="accent"
            >
              <mat-label>Nome</mat-label>
              <input
                matInput
                placeholder="Nome"
                type="text"
                #name="ngModel"
                ngModel
                name="name"
                required
              />
            </mat-form-field>

            <mat-form-field
              class="example-full-width"
              appearance="fill"
              color="accent"
              type="text"
            >
              <mat-label>Email</mat-label>
              <input
                matInput
                placeholder="Email"
                type="email"
                #email="ngModel"
                ngModel
                name="email"
                required
              />
            </mat-form-field>

            <mat-form-field
              class="example-full-width"
              appearance="fill"
              color="accent"
              type="email"
            >
              <mat-label>Password</mat-label>
              <input
                matInput
                type="password"
                #password="ngModel"
                placeholder="Password"
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
                  type="submit"
                  [disabled]="form.invalid"
                >
                  Registrati
                </button>
              </div>
            </mat-card-actions>
          </form>
        </mat-card-content>
        <mat-card-footer>
          <p>
            Sei già registrato?
            <span class="ul" [routerLink]="'/login'">Accedi!</span>
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
      }
      .example-form {
        min-width: 150px;
        max-width: 500px;
        width: 100%;
      }

      input {
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
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onsubmit(form: NgForm) {
    console.log(form.value);
    await this.authService.registration(form.value).subscribe(() => {
      this.authService.registration(form.value);
    });
    alert('Nuovo User registrato correttamente!');
    this.router.navigate(['/login']);
  }
}
