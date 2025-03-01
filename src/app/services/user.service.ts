import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSource = new BehaviorSubject<User[]>([]);
  users$ = this.userSource.asObservable();
  private apiUrl = 'https://reqres.in/api/users?per_page=100';
  private currentUserSource = new BehaviorSubject<User | null>(null); // Add this line
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(map((response) => response.data));
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSource.next(user);
  }

  setUser(user: User): void {
    console.log('User data set in service:', user);
    const updatedUsers = [...this.userSource.value, user]; // Add user to array
    this.userSource.next(updatedUsers);
  }

  searchUsers(searchTerm: string): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.data),
      map((users) =>
        users.filter((user: any) => {
          const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
          return fullName.includes(searchTerm.toLowerCase());
        })
      ),
      map((users) =>
        users.map((user: any) => ({
          name: `${user.first_name} ${user.last_name}`,
          picture: user.avatar,
        }))
      )
    );
  }

  fetchUsers(): void {
    this.http
      .get<any>(this.apiUrl)
      .pipe(
        map((response) => response.data),
        map((users) =>
          users.map((user: any) => ({
            name: `${user.first_name} ${user.last_name}`,
            picture: user.avatar,
          }))
        )
      )
      .subscribe((users: User[]) => {
        // Corrected type to User[]
        this.userSource.next(users);
      });
  }

  removeUser(userToRemove: User): void {
    const updatedUsers = this.userSource.value.filter(
      (user) => user !== userToRemove
    );
    this.userSource.next(updatedUsers);
  }
}
