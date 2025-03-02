import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/everything?q=india&apiKey=2721ecbe48e14ef89e9c9ceb4a8b26b2';

  constructor(private http: HttpClient) {}

  getTrendingNews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
