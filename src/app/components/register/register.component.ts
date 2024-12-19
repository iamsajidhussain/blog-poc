import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  usernameError: boolean = false;
  passwordError: boolean = false;
  passwordMismatch: boolean = false;
  registrationError: string | null = null; 

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  register(): void {
    this.usernameError = false;
    this.passwordError = false;
    this.passwordMismatch = false;
    this.registrationError = null;

    if (!this.username.trim()) {
      this.usernameError = true;
    }
    if (!this.password.trim()) {
      this.passwordError = true;
    }
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
    }

    if (this.usernameError || this.passwordError || this.passwordMismatch) {
      return;
    }

    const user = { username: this.username, password: this.password };
    const isRegistered = this.authService.register(user);

    if (isRegistered) {
      this.router.navigate(['/login']);
    } else {
      this.registrationError = 'Username already exists. Please choose another one.';
    }
  }
}
