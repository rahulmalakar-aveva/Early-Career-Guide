import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = 'http://localhost:5037/api';

  constructor(private http: HttpClient) {}

  getLinks() {
    return this.http.get<any[]>(`${this.base}/useful-links`);
  }

  getQna() {
    return this.http.get<any[]>(`${this.base}/qna`);
  }

  getPosts(type: string) {
    return this.http.get<any[]>(`${this.base}/posts?type=${type}`);
  }
}