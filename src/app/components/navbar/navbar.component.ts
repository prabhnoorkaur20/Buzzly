import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() logo: string = ''; // Add logo input if needed

  constructor(private router: Router) {
    this.logo = 'images/logo.png';
  } // Inject Router

  navigateToHome(): void {
    this.router.navigate(['/home']); // Navigate to home component
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']); // Navigate to profile component
  }

  navigateToNotification(): void {
    this.router.navigate(['/notification']); // Navigate to home component
  }
}
