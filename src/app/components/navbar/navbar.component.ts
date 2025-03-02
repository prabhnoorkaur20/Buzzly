import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Input,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit, OnInit {
  @Input() logo: string = '';
  isDarkMode = false;
  searchTerm: string = '';
  searchResults: any = ([] = []);
  allUsers: any = ([] = []);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserService
  ) {
    this.logo = 'images/logo.png';
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((results) => {
      this.allUsers = results;
      this.searchResults = this.allUsers;
    });
  }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', () => {
      const darkModePreference = localStorage.getItem('darkMode');
      if (darkModePreference === 'enabled') {
        setTimeout(() => {
          this.isDarkMode = true;
          document.body.classList.add('dark-mode');
        });
      }
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToAddPost(): void {
    this.router.navigate(['/addPost']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToNotification(): void {
    this.router.navigate(['/notification']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToChat(): void {
    this.router.navigate(['/chat']);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
  }

  searchUsers() {
    if (this.searchTerm) {
      const term = this.searchTerm.trim().toLowerCase();
      this.searchResults = this.allUsers.filter((user: any) => {
        const fullName = `${user.first_name} ${user.last_name}`
          .trim()
          .toLowerCase();
        return fullName.includes(term);
      });
    } else {
      this.searchResults = this.allUsers;
    }
  }
}
