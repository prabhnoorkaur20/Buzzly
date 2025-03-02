import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

interface Post {
  title: string;
  body: string;
  likes: number;
  liked: boolean;
  imageUrl: string;
  videoUrl: string;
  userId: number;
  username: string;
}

@Component({
  selector: 'app-middle-panel',
  imports: [CommonModule],
  templateUrl: './middle-panel.component.html',
  styleUrls: ['./middle-panel.component.css'],
})
export class MiddlePanelComponent implements OnInit {
  posts: Post[] = [];
  users: any[] = [];
  private API_URL = 'https://dummyjson.com/posts';
  private USER_API = 'https://dummyjson.com/users';
  currentPage = 1;
  postsPerPage = 3;

  @Input() localStoragePosts: any[] = []; // Receive posts from HomeComponent

  private postsSubject = new BehaviorSubject<Post[]>([]);
  posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<{ posts: any }>(this.API_URL).subscribe((response) => {
      let uniqueUsers = new Set();
      const newPosts = response.posts
        .filter((post: { userId: unknown }) => {
          if (uniqueUsers.has(post.userId)) {
            return false;
          }
          uniqueUsers.add(post.userId);
          return true;
        })
        .map((post: { title: any; body: any; userId: any }, index: number) => ({
          title: post.title,
          body: post.body,
          likes: Math.floor(Math.random() * 100),
          liked: false,
          imageUrl: `https://picsum.photos/600/400?random=${index}`,
          videoUrl:
            index % 3 === 0 ? 'https://www.w3schools.com/html/mov_bbb.mp4' : '',
          userId: post.userId,
          username: this.getRandomUsername(), // Generate username here
        }));
      this.posts = newPosts;
      this.postsSubject.next(newPosts); // Update BehaviorSubject
      this.fetchUsers();
    });
  }

  fetchUsers() {
    this.http.get<any>(this.USER_API).subscribe((users) => {
      this.users = users;
    });
  }

  getRandomUsername(): string {
    const names = [
      'Alice',
      'Bob',
      'Charlie',
      'Dave',
      'Eve',
      'Jona',
      'Faye',
      'Emily',
      'Liam',
      'Olivia',
      'Noah',
      'Emma',
      'Sophia',
      'Jackson',
      'Aiden',
      'Lucas',
      'Mia',
      'Isabella',
      'Ethan',
      'Ava',
      'Jacob',
      'Madison',
      'Abigail',
      'Daniel',
      'Emily',
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

  toggleLike(post: any) {
    post.liked = !post.liked;
    if (typeof post.likes !== 'number') {
      post.likes = 0; // Initialize likes if not a number
    }
    post.likes += post.liked ? 1 : -1;

    // Update localStorage
    if (this.localStoragePosts.includes(post)) {
      const index = this.localStoragePosts.indexOf(post);
      this.localStoragePosts[index] = post;
      localStorage.setItem('posts', JSON.stringify(this.localStoragePosts));
    }
  }

  getCurrentPosts(): any {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    return this.posts.slice(startIndex, endIndex);
  }

  // Pagination controls
  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPages()) {
      this.currentPage = pageNumber;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.posts.length / this.postsPerPage);
  }
}
