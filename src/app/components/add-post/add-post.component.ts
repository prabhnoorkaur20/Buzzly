import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  imports: [FormsModule, CommonModule, NavbarComponent],
  standalone: true,
})
export class AddPostComponent implements OnInit {
  postText: string = '';
  selectedFile: File | null = null;
  selectedFileType: 'image' | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const fileType = this.selectedFile.type;
      if (fileType.startsWith('image/')) {
        this.selectedFileType = 'image';
      } else {
        this.selectedFileType = null;
        this.selectedFile = null;
        alert('Invalid file type. Please select an image.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result || null;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFileType = null;
      this.previewUrl = null;
    }
  }

  clearFile(): void {
    this.selectedFile = null;
    this.selectedFileType = null;
    this.previewUrl = null;
  }

  submitPost(): void {
    let postData: any = { text: this.postText, likes: 0  };

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        postData.fileData = reader.result;
        postData.fileType = this.selectedFileType;
        this.storePost(postData);
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.storePost(postData);
    }
  }

  private storePost(postData: any): void {
    const posts = JSON.parse(localStorage.getItem('posts') || '[]');
    postData.username = this.generateRandomUsername();
    posts.unshift(postData); // Add new post to the beginning
    localStorage.setItem('posts', JSON.stringify(posts));

    this.postText = '';
    this.selectedFile = null;
    this.selectedFileType = null;
    this.previewUrl = null;
    alert('Post added successfully!');
  }

  generateRandomUsername(): string {
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
}