import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-unit-xl gap-unit-md">
        <div>
          <h1 class="font-display-lg text-display-lg text-primary mb-2">Survival Guide</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Ask questions, share insights, and discover daily tips to accelerate your onboarding journey.</p>
        </div>
        <button (click)="navigateToQna()" class="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-sm hover:shadow-md">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">add</span>
          Ask a Question
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <!-- Left Column: Navigation / Filters -->
        <aside class="lg:col-span-3 flex flex-col gap-unit-md">
          <div class="glass-card rounded-xl p-unit-md">
            <div class="relative w-full mb-4">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" style="font-variation-settings: 'FILL' 0;">search</span>
              <input
                [(ngModel)]="searchTerm"
                class="w-full pl-10 pr-4 py-2 bg-surface text-on-surface rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-sm"
                placeholder="Search tips..."
                type="text"
              />
            </div>
            <h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">Categories</h3>
            <nav class="flex flex-col gap-1">
              <a class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-high text-primary font-medium text-body-sm cursor-pointer">
                <span>All Topics</span>
                <span class="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">{{ posts.length }}</span>
              </a>
            </nav>
          </div>

          <!-- Values -->
          <div class="glass-card rounded-xl p-unit-md bg-gradient-to-br from-surface-bright to-surface-container-high relative overflow-hidden">
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-fixed-dim/20 rounded-full blur-xl"></div>
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-tertiary-container" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
              <h3 class="font-label-md text-label-md text-on-surface font-bold">Values</h3>
            </div>
            <h4 class="font-headline-sm text-headline-sm text-primary mb-2">Impact</h4>
            <h4 class="font-headline-sm text-headline-sm text-primary mb-2">Aspiration</h4>
            <h4 class="font-headline-sm text-headline-sm text-primary mb-2">Curiosity</h4>
            <h4 class="font-headline-sm text-headline-sm text-primary mb-2">Trust</h4>
          </div>
        </aside>

        <!-- Main Feed Column -->
        <div class="lg:col-span-9 flex flex-col gap-unit-md">
          @if (loading) {
            <div class="flex items-center justify-center py-16 text-on-surface-variant">
              <span class="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
            </div>
          }

          <!-- Dynamic Tip Cards from API -->
          <div *ngFor="let p of filteredPosts"
               class="glass-card rounded-xl p-0 overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] border-l-4 border-l-tertiary-fixed-dim">
            <div class="p-unit-md flex-grow">
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">Tip</span>
              </div>
              <h3 class="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">{{ p.title }}</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">{{ p.content }}</p>
              <div class="flex items-center gap-3">
                <span class="text-xs text-on-surface-variant">Shared by <span class="font-medium text-on-surface">{{ p.authorName }}</span></span>
              </div>
            </div>
            <div class="hidden md:block w-48 bg-surface-container-low relative">
              <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#0038b4 1px, transparent 1px); background-size: 16px 16px;"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="material-symbols-outlined text-6xl text-primary/30" style="font-variation-settings: 'FILL' 0;">lightbulb</span>
              </div>
            </div>
          </div>

          @if (!loading && posts.length === 0) {
            <div class="text-center py-16 text-on-surface-variant">
              <span class="material-symbols-outlined text-[48px] text-outline-variant mb-4 block">lightbulb</span>
              <p class="font-body-lg text-body-lg">No tips yet. Check back soon!</p>
            </div>
          }
        </div>
      </div>
    </main>
  `
})
export class TipsComponent implements OnInit {
  posts: any[] = [];
  searchTerm = '';
  loading = false;

  constructor(private cdr: ChangeDetectorRef, private router: Router, private api: ApiService) {}

  get filteredPosts() {
    if (!this.searchTerm) return this.posts;
    const term = this.searchTerm.toLowerCase();
    return this.posts.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.content.toLowerCase().includes(term)
    );
  }

  ngOnInit() {
    this.loading = true;
    this.api.getPosts('tip').subscribe({
      next: (data) => { this.posts = data; this.loading = false; this.cdr.markForCheck(); },
      error: () => { this.loading = false; }
    });
  }

  navigateToQna() {
    this.router.navigate(['/qna']);
  }
}