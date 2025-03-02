import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  logotext = '';
  signupImg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      emailid: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: [''], // Optional
    });
    (this.signupImg = 'images/signup.jpg'),
      (this.logotext = 'images/logotext.png');
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    console.log("on submit called");
    if (this.signupForm.valid) {
      this.authService.signUp(this.signupForm.value).subscribe(
        (response) => {
          console.log('Signup Successful', response);
          this.router.navigate(['/login']); 
        },
        (error) => {
          this.errorMessage = 'Signup failed. Try again.';
          console.error('Signup failed', error);
        }
      );
    }
  }
}
