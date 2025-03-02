// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-middle-panel',
//   imports: [CommonModule],
//   templateUrl: './middle-panel.component.html',
//   styleUrl: './middle-panel.component.css',
// })
// export class MiddlePanelComponent implements OnInit {
//   posts: any[] = [];
//   private API_URL = 'https://dummyjson.com/posts';

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchPosts();
//   }

//   fetchPosts() {
//     this.http.get<{ posts: any[] }>(this.API_URL).subscribe((response) => {
//       this.posts = response.posts.map((post, index) => ({
//         title: post.title,
//         body: post.body,
//         likes: Math.floor(Math.random() * 100), // Random like count
//         liked: false,
//         imageUrl: `https://picsum.photos/600/400?random=${index}`,
//         videoUrl:
//           index % 3 === 0 ? 'https://www.w3schools.com/html/mov_bbb.mp4' : '',
//       }));
//     });
//   }

//   toggleLike(post: any) {
//     post.liked = !post.liked;
//     post.likes += post.liked ? 1 : -1;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Post {
  title: string;
  body: string;
  likes: number;
  liked: boolean;
  imageUrl: string;
  videoUrl: string;
  userId: number;
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<{ posts: any }>(this.API_URL).subscribe((response) => {
      let uniqueUsers = new Set(); // To store unique user ID's
      this.posts = response.posts
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
        }));

      this.fetchUsers();
    });
  }

  fetchUsers() {
    this.http.get<any>(this.USER_API).subscribe((users) => {
      this.users = users;
    });
  }

  // Generate a random username
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

  toggleLike(post: Post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }
}
