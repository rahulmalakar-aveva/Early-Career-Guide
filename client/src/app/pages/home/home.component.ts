import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SessionsService, Session } from '../../services/sessions.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="flex-grow flex flex-col items-center w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl gap-unit-xl">

      <!-- Welcome Hero -->
      <section class="w-full flex flex-col md:flex-row bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden">
        <div class="p-unit-xl flex-1 flex flex-col justify-center">
          <span class="font-label-md text-label-md text-on-surface-variant mb-2">Welcome to the</span>
          <h1 class="font-display-lg text-display-lg text-primary mb-4">Early Career Portal</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">
            Everything you need for your first months at AVEVA in one place. Connect, learn, and grow.
          </p>
          <div class="flex gap-4">
            <button routerLink="/tips" class="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg transition-colors shadow-sm">
              Survival Guide
            </button>
            <button routerLink="/links" class="border border-primary text-primary hover:bg-surface-container font-label-md text-label-md px-6 py-3 rounded-lg transition-colors">
              Explore Resources
            </button>
          </div>
        </div>
        <div class="flex-1 bg-surface-container min-h-[300px] relative hidden md:block">
          <img alt="Team Collaboration" class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmC3b8Z4ahcKwagInKuLsI0OBJWYTwG0J13MDSsvqxO5WzdN_O7L_XVh-HBC_YkvXPT9Nm3MAHiPPuJrl5OPhhS0GdEDdOGpiAG1pod-myJFU8SEUtJRmqO9izzV_JvdZmSdDiVYhMfWIkb4s5BY16PalsD_V5pzcpYxf3X5dcz5ALX4i27i_pgdjccRRvgSO61cOtMv8SJVn1FnrcUPUYXYPy-pi1B6S0l_hD6kuGyKlQYOkzOcvxlFbIO7jQ1kOhpv8Cv9oL6w" />
        </div>
      </section>

      <!-- Quick Access Grid -->
      <section class="w-full">
        <h2 class="font-headline-md text-headline-md text-on-surface mb-6">Quick Access</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-unit-md">
          <a class="bg-surface-container-lowest rounded-lg p-unit-md flex flex-col items-center justify-center gap-3 ambient-shadow hover-lift border border-transparent hover:border-primary/20 text-center" routerLink="/checklist">
            <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">checklist</span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface">First Month Checklist</span>
          </a>
          <a class="bg-surface-container-lowest rounded-lg p-unit-md sm:p-unit-lg flex flex-col items-center justify-center gap-3 ambient-shadow hover-lift border border-transparent hover:border-primary/20 text-center min-w-0" routerLink="/questions">
            <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">groups</span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface">Peer Sessions</span>
          </a>
          <a class="bg-surface-container-lowest rounded-lg p-unit-md sm:p-unit-lg flex flex-col items-center justify-center gap-3 ambient-shadow hover-lift border border-transparent hover:border-primary/20 text-center min-w-0" routerLink="/links">
            <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">link</span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface">Useful Links</span>
          </a>
          <a class="bg-surface-container-lowest rounded-lg p-unit-md flex flex-col items-center justify-center gap-3 ambient-shadow hover-lift border border-transparent hover:border-primary/20 text-center" routerLink="/qna">
            <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">forum</span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface">Ask a Question</span>
          </a>
          <a class="bg-surface-container-lowest rounded-lg p-unit-md flex flex-col items-center justify-center gap-3 ambient-shadow hover-lift border border-transparent hover:border-primary/20 text-center" routerLink="/contacts">
            <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">contact_page</span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface">Who To Contact</span>
          </a>
          <a class="bg-surface-container-lowest rounded-lg p-unit-md flex flex-col items-center justify-center gap-3 ambient-shadow hover-lift border border-transparent hover:border-primary/20 text-center" routerLink="/faqs">
            <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">help_outline</span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface">FAQs</span>
          </a>
        </div>
      </section>

            <!-- Two Column Section -->
      <section class="w-full flex flex-col lg:flex-row gap-unit-lg">

        <!-- Onboarding Progress -->
        <div class="flex-1 bg-surface-container-lowest rounded-xl ambient-shadow p-unit-lg flex flex-col">
          <div class="flex justify-between items-center mb-6">
            <h2 class="font-headline-sm text-headline-sm text-on-surface">Onboarding Progress</h2>
          </div>
          <div class="flex-grow flex flex-col justify-center gap-6">
            <!-- Progress Timeline -->
            <div class="relative flex justify-between items-stretch">
              <div class="absolute top-3 left-0 w-full h-1 bg-surface-container-highest rounded-full -z-10"></div>
              <div class="absolute top-3 left-0 w-1/4 h-1 bg-primary rounded-full -z-10 transition-all duration-500"></div>
              <div class="flex-1 min-w-0 self-stretch flex flex-col items-center gap-4 border border-outline-variant/90 rounded-xl px-3 py-4 bg-surface-container-lowest/70 shadow-sm text-center">
                <div class="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-primary text-primary flex items-center justify-center border-4 border-surface-container-lowest">
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span class="font-label-sm text-label-sm text-on-surface font-bold">Week 1</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">New Hiring Orientation</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Meet your onboarding buddy</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Set up core accounts</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Learn the portal basics</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Review team expectations</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Complete first-week forms</span>
              </div>
              <div class="flex-1 min-w-0 self-stretch flex flex-col items-center gap-4 border border-outline-variant/90 rounded-xl px-3 py-4 bg-surface-container-lowest/70 shadow-sm text-center">
                <div class="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-primary text-primary flex items-center justify-center border-4 border-surface-container-lowest">
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span class="font-label-sm text-label-sm text-on-surface font-bold">Week 2</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Knowing AVEVA &amp; Culture</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Explore the company mission</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Attend team intros</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Learn internal tools</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Join a culture session</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Set learning goals</span>
              </div>
              <div class="flex-1 min-w-0 self-stretch flex flex-col items-center gap-4 border border-outline-variant/90 rounded-xl px-3 py-4 bg-surface-container-lowest/70 shadow-sm text-center">
                <div class="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-primary text-primary flex items-center justify-center border-4 border-surface-container-lowest">
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span class="font-label-sm text-label-sm text-on-surface font-bold">Week 3</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Tools &amp; Training</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Try hands-on exercises</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Complete security training</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Practice daily workflows</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Shadow a teammate</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Collect feedback early</span>
              </div>
              <div class="flex-1 min-w-0 self-stretch flex flex-col items-center gap-4 border border-outline-variant/90 rounded-xl px-3 py-4 bg-surface-container-lowest/70 shadow-sm text-center">
                <div class="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-primary text-primary flex items-center justify-center border-4 border-surface-container-lowest">
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span class="font-label-sm text-label-sm text-on-surface font-bold">Week 4</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Team Integration &amp; Setup</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Own a small task</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Review onboarding progress</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Confirm recurring meetings</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Plan your next milestones</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Celebrate first month wins</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scheduled Peer Sessions -->
        <div class="flex-1 bg-surface-container-lowest rounded-xl ambient-shadow p-unit-lg flex flex-col">
          <div class="flex justify-between items-center mb-6">
            <h2 class="font-headline-sm text-headline-sm text-on-surface">Scheduled Peer Sessions</h2>
            <a class="font-label-sm text-label-sm text-primary hover:underline" routerLink="/questions">View all</a>
          </div>
          <div class="flex flex-col gap-4">
            <div *ngFor="let s of previewSessions"
                 class="flex items-center justify-between p-4 rounded-lg hover:bg-surface-container transition-colors border border-outline-variant/30">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0 text-primary">
                  <span class="font-label-sm text-label-sm font-bold uppercase leading-none text-[9px]">{{ monthOf(s.date) }}</span>
                  <span class="font-headline-sm text-headline-sm font-bold leading-none">{{ dayOf(s.date) }}</span>
                </div>
                <div>
                  <h3 class="font-label-md text-label-md text-on-surface">{{ s.title }}</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant text-xs">by {{ s.host }}</p>
                  <p class="font-body-sm text-body-sm text-on-surface-variant text-xs mt-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">schedule</span>
                    {{ formatDate(s.date) }} &bull; {{ s.time }}
                  </p>
                </div>
              </div>
              <a [href]="s.joinLink" target="_blank" rel="noopener noreferrer"
                 class="bg-primary hover:bg-primary/90 text-on-primary font-label-sm text-label-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                Join
              </a>
            </div>
            <div *ngIf="previewSessions.length === 0"
                 class="text-center py-8 text-on-surface-variant">
              <span class="material-symbols-outlined text-[40px] text-outline-variant mb-2 block">event_busy</span>
              <p class="font-body-sm text-body-sm">No upcoming sessions.</p>
            </div>
          </div>
        </div>

      </section>
    </main>
  `
})
export class HomeComponent {
  constructor(private svc: SessionsService) {}

  get previewSessions(): Session[] { return this.svc.sessions.slice(0, 3); }

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