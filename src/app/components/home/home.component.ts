import { Component, NgZone, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MiddlePanelComponent } from '../middle-panel/middle-panel.component';
import { RightPanelComponent } from '../right-panel/right-panel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    MiddlePanelComponent,
    RightPanelComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  showAnimation = true;
  logo = '';
  posts: any[] = [];

  constructor(private ngZone: NgZone) {
    this.logo = 'images/logo.png';

    const hasVisited = sessionStorage.getItem('hasVisitedHome');

    if (!hasVisited) {
      this.showAnimation = true;
      sessionStorage.setItem('hasVisitedHome', 'true');

      setTimeout(() => {
        this.ngZone.run(() => {
          this.showAnimation = false;
        });
      }, 2500);
    } else {
      this.showAnimation = false;
    }
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.posts = JSON.parse(localStorage.getItem('posts') || '[]');
  }
}