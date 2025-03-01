import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-middle-panel',
  imports: [CommonModule],
  templateUrl: './middle-panel.component.html',
  styleUrl: './middle-panel.component.css',
})
export class MiddlePanelComponent implements OnInit {
  posts: any[] = [];
  private API_URL = 'https://dummyjson.com/posts';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<{ posts: any[] }>(this.API_URL).subscribe((response) => {
      this.posts = response.posts.map((post, index) => ({
        title: post.title,
        body: post.body,
        likes: Math.floor(Math.random() * 100), // Random like count
        liked: false,
        imageUrl: `https://picsum.photos/600/400?random=${index}`,
        videoUrl:
          index % 3 === 0 ? 'https://www.w3schools.com/html/mov_bbb.mp4' : '',
      }));
    });
  }

  toggleLike(post: any) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }  
}
