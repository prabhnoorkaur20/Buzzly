import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = '/api/OnlineTest/GetAllUsers';
  private signupUrl = '/api/OnlineTest/createNewUser';
  private loginUrl = '/api/OnlineTest/Login';
  private isLoggedIn = false;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
  }

  signUp(userData: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, userData);
  }

  login(credentials: any): Observable<any> {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    return this.http.post<any>(this.loginUrl, credentials);
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    const storedStatus = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = storedStatus === 'true';
    return this.isLoggedIn;
  }
}
