import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RightPanelComponent } from '../components/right-panel/right-panel.component';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Post {
  id: number;
  userId: number;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  caption?: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, NavbarComponent, RightPanelComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isEditing = false;
  editedUser: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  };
  posts: Post[] = [];
  private userSubscription: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchPosts();
    this.userSubscription = this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.user = user;
        this.cdr.detectChanges(); // Force change detection
      }
    });
  }

  fetchUser(): void {
    this.http.get<any>('https://reqres.in/api/users/1').subscribe(
      (response) => {
        console.log('API response:', response); // Add this line
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

  fetchPosts(): void {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(
        (apiPosts) => {
          this.posts = apiPosts.map((post) => ({
            id: post.id,
            userId: post.userId,
            mediaType: 'image',
            mediaUrl: `https://picsum.photos/id/${post.id}/500/300`,
            caption: post.title,
          }));
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
  }

  enableEdit(): void {
    console.log('User data before navigation:', this.user); // Add this line
    if (this.user) {
      this.router.navigate(['/edit-profile'], {
        state: { user: this.user },
      });
    } else {
      console.error('User data is null or undefined.');
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
