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

  createQna(question: string) {
    return this.http.post<any>(`${this.base}/qna`, { question });
  }

  answerQna(id: string, answer: string) {
    return this.http.put<any>(`${this.base}/qna/${id}/answer`, { answer });
  }

  deleteQna(id: string) {
    return this.http.delete(`${this.base}/qna/${id}`);
  }

  getPosts(type: string) {
    return this.http.get<any[]>(`${this.base}/posts/${type}`);
  }

  getContacts() {
    return this.http.get<any[]>(`${this.base}/contacts`);
  }

  createContact(name: string, email: string) {
    return this.http.post<any>(`${this.base}/contacts`, { name, email });
  }

  getFaqs() {
    return this.http.get<any[]>(`${this.base}/faqs`);
  }

  getFaqsByCategory(category: string) {
    return this.http.get<any[]>(`${this.base}/faqs/category/${category}`);
  }
}