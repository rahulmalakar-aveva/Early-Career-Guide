import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionsService, Session } from '../../services/sessions.service';

@Component({
  selector: 'app-peer-sessions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl flex flex-col gap-unit-xl">

      <!-- Header -->
      <div>
        <h1 class="font-display-lg text-display-lg text-primary mb-2">Peer Sessions</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant">Scheduled team meetings and quick-access links — all in one place.</p>
      </div>

      <!-- Two-column layout -->
      <div class="flex flex-col lg:flex-row gap-unit-lg items-start">

        <!-- Scheduled Sessions -->
        <section class="flex-[2] flex flex-col gap-unit-md">
          <h2 class="font-headline-md text-headline-md text-on-surface">Scheduled Sessions</h2>

          <div *ngFor="let s of sessions"
               class="bg-surface-container-lowest rounded-xl ambient-shadow p-unit-md flex flex-col sm:flex-row sm:items-center gap-4 border border-outline-variant/30 hover:border-primary/30 transition-colors">
            <div class="w-14 h-14 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0 text-primary">
              <span class="font-label-sm text-label-sm font-bold uppercase leading-none">{{ monthOf(s.date) }}</span>
              <span class="font-headline-md text-headline-md font-bold leading-none">{{ dayOf(s.date) }}</span>
            </div>
            <div class="flex-grow min-w-0">
              <h3 class="font-label-lg text-label-lg text-on-surface font-semibold truncate">{{ s.title }}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Hosted by <span class="font-medium text-on-surface">{{ s.host }}</span>
              </p>
              <p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                <span class="material-symbols-outlined text-[14px]">schedule</span>
                {{ formatDate(s.date) }} &bull; {{ s.time }}
              </p>
            </div>
            <a [href]="s.joinLink" target="_blank" rel="noopener noreferrer"
               class="bg-primary hover:bg-primary/90 text-on-primary font-label-sm text-label-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 self-start sm:self-center">
              <span class="material-symbols-outlined text-[16px]">video_call</span>
              Join
            </a>
            <button (click)="removeSession(s.id)"
                    class="p-2 rounded-lg text-error hover:bg-error/10 transition-colors self-start sm:self-center"
                    title="Remove session">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>

          <!-- Empty state -->
          <div *ngIf="sessions.length === 0"
               class="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-unit-xl text-center text-on-surface-variant">
            <span class="material-symbols-outlined text-[48px] text-outline-variant mb-3 block">event_busy</span>
            <p class="font-body-lg text-body-lg">No sessions scheduled yet.</p>
          </div>
        </section>

        <!-- Schedule a Session Form -->
        <aside class="flex-1 lg:sticky lg:top-6">
          <div class="bg-surface-container-lowest rounded-xl ambient-shadow p-unit-md border border-outline-variant/30">
            <h3 class="font-label-lg text-label-lg text-on-surface font-semibold mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[20px]">add_circle</span>
              Schedule a Session
            </h3>
            <div class="flex flex-col gap-3 mb-3">
              <input [(ngModel)]="newSession.title" placeholder="Session title"
                     class="rounded-lg px-3 py-2 bg-surface-container border border-outline-variant/50 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary transition-colors" />
              <input [(ngModel)]="newSession.host" placeholder="Host name"
                     class="rounded-lg px-3 py-2 bg-surface-container border border-outline-variant/50 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary transition-colors" />
              <input [(ngModel)]="newSession.date" type="date"
                     class="rounded-lg px-3 py-2 bg-surface-container border border-outline-variant/50 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary transition-colors" />
              <input [(ngModel)]="newSession.time" type="time"
                     class="rounded-lg px-3 py-2 bg-surface-container border border-outline-variant/50 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary transition-colors" />
              <input [(ngModel)]="newSession.joinLink" placeholder="Meeting link (Teams / Zoom / Meet)"
                     class="rounded-lg px-3 py-2 bg-surface-container border border-outline-variant/50 text-on-surface font-body-sm text-body-sm focus:outline-none focus:border-primary transition-colors" />
            </div>
            <button (click)="addSession()"
                    [disabled]="!newSession.title || !newSession.date || !newSession.joinLink"
                    class="w-full bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-on-primary font-label-sm text-label-sm px-5 py-2.5 rounded-lg transition-colors">
              Add Session
            </button>
          </div>
        </aside>

      </div>
    </main>
  `
})
export class PeerSessionsComponent {
  constructor(public svc: SessionsService) {}

  get sessions(): Session[] { return this.svc.sessions; }

  newSession: Partial<Session> = { title: '', host: '', date: '', time: '', joinLink: '' };

  addSession() {
    if (!this.newSession.title || !this.newSession.date || !this.newSession.joinLink) return;
    this.svc.add({
      title: this.newSession.title!,
      host: this.newSession.host || 'TBC',
      date: this.newSession.date!,
      time: this.newSession.time || 'TBC',
      joinLink: this.newSession.joinLink!,
    });
    this.newSession = { title: '', host: '', date: '', time: '', joinLink: '' };
  }

  removeSession(id: number) { this.svc.remove(id); }

  monthOf(dateStr: string): string {
    return new Date(dateStr).toLocaleString('default', { month: 'short' });
  }

  dayOf(dateStr: string): string {
    return new Date(dateStr).getDate().toString();
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }
}