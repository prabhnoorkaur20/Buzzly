import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
// Import the SwipeModule for standalone component
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Interfaces
interface Post {
  title?: string;
  body?: string;
  text?: string;
  likes: number;
  liked: boolean;
  media: MediaItem[];
  userId?: number;
  username: string;
}

interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

@Component({
  selector: 'app-middle-panel',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this for custom elements like swiper
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSwiper();
    this.fetchPosts();
  }

  // Dynamically load Swiper
  loadSwiper() {
    // Load Swiper JS and CSS dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js';
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css';
    document.head.appendChild(link);

    // Initialize Swiper after loading
    script.onload = () => {
      this.initializeSwiper();
    };
  }

  // Initialize Swiper instances
  initializeSwiper() {
    setTimeout(() => {
      const swipers = document.querySelectorAll('.swiper');
      if (swipers.length > 0) {
        swipers.forEach((swiperEl) => {
          new (window as any).Swiper(swiperEl, {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
          });
        });
      }
    }, 100);
  }

  fetchPosts() {
    this.http.get<{ posts: any }>(this.API_URL).subscribe((response) => {
      let uniqueUsers = new Set();
      const apiPosts = response.posts
        .filter((post: { userId: unknown }) => {
          if (uniqueUsers.has(post.userId)) {
            return false;
          }
          uniqueUsers.add(post.userId);
          return true;
        })
        .map((post: { title: any; body: any; userId: any }, index: number) => {
          // Create media array with potential multiple items
          const media: MediaItem[] = [];
          
          // Add image if available (always for demo)
          media.push({
            type: 'image',
            url: `https://picsum.photos/600/400?random=${index}`
          });
          
          // Add video for some posts
          if (index % 3 === 0) {
            media.push({
              type: 'video',
              url: 'https://www.w3schools.com/html/mov_bbb.mp4'
            });
          }
          
          return {
            title: post.title,
            body: post.body,
            likes: Math.floor(Math.random() * 100),
            liked: false,
            media: media,
            userId: post.userId,
            username: this.getRandomUsername(),
          };
        });
      
      // Convert localStorage posts to the new format
      const formattedLocalPosts = this.localStoragePosts.map(post => {
        const media: MediaItem[] = [];
        
        if (post.fileType === 'image' && post.fileData) {
          media.push({
            type: 'image',
            url: post.fileData
          });
        }
        
        if (post.fileType === 'video' && post.fileData) {
          media.push({
            type: 'video',
            url: post.fileData
          });
        }
        
        return {
          text: post.text,
          likes: post.likes || 0,
          liked: post.liked || false,
          media: media,
          username: post.username
        };
      });
      
      // Combine local storage posts with API posts
      this.posts = [...formattedLocalPosts, ...apiPosts];
      this.fetchUsers();
      
      // Initialize Swiper after posts are loaded
      setTimeout(() => {
        this.initializeSwiper();
      }, 500);
    });
  }

  fetchUsers() {
    this.http.get<any>(this.USER_API).subscribe((users) => {
      this.users = users;
    });
  }

  getRandomUsername(): string {
    const names = [
      'Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Jona', 'Faye',
      'Emily', 'Liam', 'Olivia', 'Noah', 'Emma', 'Sophia',
      'Jackson', 'Aiden', 'Lucas', 'Mia', 'Isabella', 'Ethan',
      'Ava', 'Jacob', 'Madison', 'Abigail', 'Daniel', 'Emily',
    ];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  }

  toggleLike(post: Post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    // Update localStorage if needed
    const localPost = this.localStoragePosts.find(p => 
      p.username === post.username && 
      ((p.text && p.text === post.text) || 
       (p.fileData && post.media.some(m => m.url === p.fileData)))
    );
    
    if (localPost) {
      localPost.liked = post.liked;
      localPost.likes = post.likes;
      localStorage.setItem('posts', JSON.stringify(this.localStoragePosts));
    }
  }

  getCurrentPosts(): Post[] {
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