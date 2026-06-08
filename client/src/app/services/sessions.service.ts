import { Injectable } from '@angular/core';

export interface Session {
  id: number;
  title: string;
  host: string;
  date: string;
  time: string;
  joinLink: string;
}

@Injectable({ providedIn: 'root' })
export class SessionsService {
  sessions: Session[] = [
    { id: 1, title: 'Tool Walkthrough', host: 'Member of Technical Staff', date: '2026-06-13', time: '4:00 PM', joinLink: '#' },
    { id: 2, title: 'Ask Me Anything', host: 'Principal Technologist', date: '2026-06-18', time: '5:00 PM', joinLink: '#' },
  ];

  private nextId = 3;

  add(session: Omit<Session, 'id'>): void {
    this.sessions = [...this.sessions, { id: this.nextId++, ...session }];
  }

  remove(id: number): void {
    this.sessions = this.sessions.filter(s => s.id !== id);
  }
}
