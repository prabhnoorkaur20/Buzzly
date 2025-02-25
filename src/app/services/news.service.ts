import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsdata.io/api/1/news?apikey=pub_715524013b3f76f8b11dc18c8270eeff2891e&q=top%20headlines&language=en&category=entertainment,lifestyle,sports,top,world';

  constructor(private http: HttpClient) {}

  getTrendingNews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
