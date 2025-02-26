import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/user.service';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  user: User | null = null;
  editedUser: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  };
  password = '';
  showPassword = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.http.get<any>('https://reqres.in/api/users/1').subscribe(
      (response) => {
        this.user = response.data;
        if (this.user) {
          this.editedUser = { ...this.user };
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  saveProfile(): void {
    this.userService.setUser(this.editedUser);
    this.router.navigate(['/profile']);
  }

  cancelEdit(): void {
    this.router.navigate(['/profile']);
  }
}
