import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Input,
  AfterViewInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements AfterViewInit {
  @Input() logo: string = '';
  isDarkMode = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.logo = 'images/logo.png';
  }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', () => {
      const darkModePreference = localStorage.getItem('darkMode');
      if (darkModePreference === 'enabled') {
        setTimeout(() => {
          // Defer the change
          this.isDarkMode = true;
          document.body.classList.add('dark-mode');
        });
      }
    });
  }
  navigateToHome(): void {
    this.router.navigate(['/home']);
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

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', this.isDarkMode ? 'enabled' : 'disabled');
  }
}
