import { Component } from '@angular/core';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  imports: [ CommonModule, FormsModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css'
})
export class AuthLoginComponent {
  Email = '';
  Password = '';
  errorMessage = '';

  constructor(
    private authService: AuthLoginService, 
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.Email, this.Password)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
  }
}
