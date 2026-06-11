import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-peer-sessions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl flex flex-col gap-unit-xl">

      <!-- Header -->
      <div>
        <h1 class="font-display-lg text-display-lg text-primary mb-2">Peer Sessions</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant">Scheduled team meetings — join with one click.</p>
      </div>

      <!-- Loading -->
      @if (loading) {
        <div class="flex items-center justify-center py-16 text-on-surface-variant">
          <span class="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
        </div>
      }

      <!-- Sessions Grid -->
      @if (!loading) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (session of sessions; track session.id) {
            <div class="bg-surface-container-lowest rounded-2xl ambient-shadow overflow-hidden border border-outline-variant/30 hover:border-primary/30 transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex flex-col">

              <!-- Teams thumbnail -->
              <div class="relative h-36 bg-gradient-to-br from-[#464EB8] to-[#5B5EA6] flex items-center justify-center overflow-hidden">
                <!-- Decorative pattern -->
                <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 18px 18px;"></div>
                <!-- Teams logo -->
                <div class="relative flex flex-col items-center gap-3">
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 48 48" class="w-10 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33 8C33 10.761 30.761 13 28 13C25.239 13 23 10.761 23 8C23 5.239 25.239 3 28 3C30.761 3 33 5.239 33 8Z" fill="white"/>
                      <path d="M36 16H20C19.448 16 19 16.448 19 17V30C19 35.523 23.477 40 29 40C34.523 40 39 35.523 39 30V19C39 17.343 37.657 16 36 16Z" fill="white" fill-opacity="0.9"/>
                      <path d="M20 16C18.343 16 17 17.343 17 19V28C17 31.866 20.134 35 24 35V19C24 17.343 22.657 16 21 16H20Z" fill="white" fill-opacity="0.6"/>
                      <circle cx="13" cy="11" r="5" fill="white" fill-opacity="0.7"/>
                      <path d="M10 22H16C17.105 22 18 22.895 18 24V34C18 36.209 16.209 38 14 38H12C9.791 38 8 36.209 8 34V24C8 22.895 8.895 22 10 22Z" fill="white" fill-opacity="0.6"/>
                    </svg>
                  </div>
                  <span class="text-white/90 font-label-sm text-label-sm uppercase tracking-widest text-xs">Microsoft Teams</span>
                </div>
              </div>

              <!-- Card content -->
              <div class="p-5 flex flex-col flex-grow gap-4">
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold leading-tight mb-1">{{ session.title }}</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">video_call</span>
                    Teams Meeting
                  </p>
                </div>

                <div class="mt-auto">
                  <a [href]="session.joinLink"
                     target="_blank"
                     rel="noopener noreferrer"
                     class="w-full bg-[#464EB8] hover:bg-[#3a41a0] text-white font-label-md text-label-md px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <span class="material-symbols-outlined text-[18px]">video_call</span>
                    Join Session
                  </a>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Empty state -->
        @if (sessions.length === 0) {
          <div class="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-unit-xl text-center text-on-surface-variant">
            <span class="material-symbols-outlined text-[48px] text-outline-variant mb-3 block">event_busy</span>
            <p class="font-body-lg text-body-lg">No sessions scheduled yet.</p>
            <p class="font-body-sm text-body-sm mt-1">Check back soon or ask an admin to add one!</p>
          </div>
        }
      }
    </main>
  `
})
export class PeerSessionsComponent implements OnInit {
  sessions: any[] = [];
  loading = false;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.api.getPeerSessions().subscribe({
      next: (data) => { this.sessions = data; this.loading = false; this.cdr.markForCheck(); },
      error: () => { this.loading = false; this.cdr.markForCheck(); }
    });
  }
}