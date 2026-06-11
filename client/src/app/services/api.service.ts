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

  // Posts (Tips)
  createPost(data: any) {
    return this.http.post<any>(`${this.base}/posts`, data);
  }

  updatePost(id: string, data: any) {
    return this.http.put<any>(`${this.base}/posts/${id}`, data);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.base}/posts/${id}`);
  }

  // Useful Links
  createLink(data: any) {
    return this.http.post<any>(`${this.base}/useful-links`, data);
  }

  updateLink(id: string, data: any) {
    return this.http.put<any>(`${this.base}/useful-links/${id}`, data);
  }

  deleteLink(id: string) {
    return this.http.delete(`${this.base}/useful-links/${id}`);
  }

  // FAQs
  createFaq(data: any) {
    return this.http.post<any>(`${this.base}/faqs`, data);
  }

  updateFaq(id: number, data: any) {
    return this.http.put<any>(`${this.base}/faqs/${id}`, data);
  }

  deleteFaq(id: number) {
    return this.http.delete(`${this.base}/faqs/${id}`);
  }

  // Contacts
  updateContact(id: number, data: any) {
    return this.http.put<any>(`${this.base}/contacts/${id}`, data);
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.base}/contacts/${id}`);
  }

  // Peer Sessions
  getPeerSessions() {
    return this.http.get<any[]>(`${this.base}/peer-sessions`);
  }

  createPeerSession(data: any) {
    return this.http.post<any>(`${this.base}/peer-sessions`, data);
  }

  updatePeerSession(id: number, data: any) {
    return this.http.put<any>(`${this.base}/peer-sessions/${id}`, data);
  }

  deletePeerSession(id: number) {
    return this.http.delete(`${this.base}/peer-sessions/${id}`);
  }
}