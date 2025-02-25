import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Use .css if you changed it from SCSS
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  signupImg = '';
  logotext = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailid: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.signupImg= 'images/signup.jpg',
    this.logotext = 'images/logotext.png'
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login Successful', response);
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/home']); // Redirect to home page after login
        },
        (error) => {
          this.errorMessage = 'Invalid email or password';
          console.error('Login failed', error);
        }
      );
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
  
}
