import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl">
      <!-- Header -->
      <div class="mb-unit-xl">
        <h1 class="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg mb-unit-sm text-on-surface">Peer Sessions</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant">Questions from junior team members — share your experience and help others grow.</p>
      </div>

      <!-- Questions Feed -->
      <div class="flex flex-col gap-unit-md">
        <div *ngFor="let p of posts"
             class="glass-card rounded-xl p-unit-md flex gap-unit-md transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] group">
          <div class="flex flex-col items-center gap-1 min-w-[48px]">
            <button class="vote-btn p-1 rounded transition-colors text-on-surface-variant">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">keyboard_arrow_up</span>
            </button>
            <span class="font-headline-sm text-headline-sm font-bold text-on-surface">{{ p.likes || 0 }}</span>
            <button class="vote-btn p-1 rounded transition-colors text-on-surface-variant">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">keyboard_arrow_down</span>
            </button>
          </div>
          <div class="flex-grow">
            <h3 class="font-headline-sm text-headline-sm font-semibold text-on-surface group-hover:text-primary transition-colors mb-2">{{ p.title }}</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mb-3">{{ p.content }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-xs">Junior Question</span>
                <span class="text-xs text-on-surface-variant">by <span class="font-medium text-on-surface">{{ p.authorName }}</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div *ngIf="posts.length === 0" class="text-center py-unit-xl text-on-surface-variant">
          <span class="material-symbols-outlined text-[48px] text-outline-variant mb-4">groups</span>
          <p class="font-body-lg text-body-lg">No peer session questions yet.</p>
        </div>
      </div>
    </main>
  `
})
export class QuestionsComponent implements OnInit {
  posts: any[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getPosts('junior').subscribe((x: any) => {
      this.posts = x;
      this.cdr.markForCheck();
    });
  }
}