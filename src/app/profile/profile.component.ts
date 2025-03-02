import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AuthService } from '../services/auth.service';

interface UserDetails {
  userId: number;
  emailid: string;
  mobileNo: string;
  password: string;
  fullName: string;
  gender: string;
  registrationCode: string;
  collegeName: string;
  stream: string;
  role: string;
}

interface ReqresUserResponse {
  data: {
    avatar: string;
  };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [FormsModule, CommonModule, NavbarComponent],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: UserDetails | null = null;
  editableUserDetails: UserDetails = {
    userId: 0,
    emailid: '',
    mobileNo: '',
    password: '',
    fullName: '',
    gender: '',
    registrationCode: '',
    collegeName: '',
    stream: '',
    role: '',
  };
  profileImage: string | null = null;
  isEditMode: boolean = false;
  userId: number = 1; // Replace with actual user ID

  faEdit = faEdit;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    this.fetchProfileImage();
  }

  fetchUserDetails(): void {
    this.authService.getAllUsers().subscribe(response => {
      console.log("API Response:", response.data);
  
      if (Array.isArray(response.data)) {
        this.userDetails = response.data.find((user: UserDetails) => user.userId === 25) || null;
      } else if (response && response.data) {
        this.userDetails = response.data.find((user: UserDetails) => user.userId === 25) || null;
      }
  
      if (this.userDetails) {
        this.editableUserDetails = { ...this.userDetails };
        console.log("User details found:", this.userDetails);
      } else {
        console.warn("User not found in response");
      }
    }, error => {
      console.error("Error fetching user details:", error);
    });
  }
  
  fetchProfileImage(): void {
    fetch(`https://reqres.in/api/users/${this.userId}`)
      .then(response => response.json())
      .then((data: ReqresUserResponse) => {
        this.profileImage = data.data.avatar;
      })
      .catch(error => console.error('Error fetching profile image:', error));
  }

  toggleEdit(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode && this.userDetails) {
      this.editableUserDetails = { ...this.userDetails };
    }
  }

  saveChanges(): void {
    if (this.userDetails) {
      this.editableUserDetails.userId = this.userDetails.userId; // Ensure userId is included
      fetch('/api/OnlineTest/updateUser', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.editableUserDetails),
      })
      .then(() => {
        this.userDetails = { ...this.editableUserDetails };
        this.isEditMode = false;
      })
      .catch(error => console.error('Error saving changes:', error));
    }
  }
}
