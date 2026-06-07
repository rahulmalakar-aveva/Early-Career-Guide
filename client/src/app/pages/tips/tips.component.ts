import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-unit-xl gap-unit-md">
        <div>
          <h1 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface mb-2">Q&A Forum &amp; Tips</h1>
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
                placeholder="Search Q&A..."
                type="text"
              />
            </div>
            <h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">Categories</h3>
            <nav class="flex flex-col gap-1">
              <a class="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-high text-primary font-medium text-body-sm cursor-pointer">
                <span>All Topics</span>
                <span class="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">{{ posts.length }}</span>
              </a>
              <a class="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors text-body-sm cursor-pointer">
                <span>Tool Related</span>
              </a>
              <a class="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors text-body-sm cursor-pointer">
                <span>HR &amp; Policies</span>
              </a>
              <a class="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors text-body-sm cursor-pointer">
                <span>Process</span>
              </a>
              <a class="flex items-center justify-between px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors text-body-sm cursor-pointer">
                <span>Other</span>
              </a>
            </nav>
          </div>

          <!-- Tip of the Day Highlight -->
          <div class="glass-card rounded-xl p-unit-md bg-gradient-to-br from-surface-bright to-surface-container-high relative overflow-hidden">
            <div class="absolute -right-4 -top-4 w-24 h-24 bg-tertiary-fixed-dim/20 rounded-full blur-xl"></div>
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-tertiary-container" style="font-variation-settings: 'FILL' 1;">lightbulb</span>
              <h3 class="font-label-md text-label-md text-on-surface font-bold">Tip of the Day</h3>
            </div>
            <h4 class="font-headline-sm text-headline-sm text-primary mb-2">First Week Setup</h4>
            <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">Don't hesitate to ask questions. Everyone was a beginner once! Reach out to your assigned buddy for quick clarifications on internal jargon.</p>
            <a class="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline cursor-pointer">
              Read more <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 0;">arrow_forward</span>
            </a>
          </div>
        </aside>

        <!-- Main Feed Column -->
        <div class="lg:col-span-9 flex flex-col gap-unit-md">
          <!-- Feed Sorting -->
          <div class="flex items-center justify-between border-b border-outline-variant/30 pb-2 mb-2">
            <div class="flex gap-4">
              <button class="font-label-md text-label-md text-primary font-bold border-b-2 border-primary pb-2 -mb-[10px]">Recent</button>
              <button class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors pb-2">Most Helpful</button>
              <button class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors pb-2">Unanswered</button>
            </div>
            <button class="text-on-surface-variant hover:text-on-surface flex items-center gap-1 text-sm">
              <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 0;">filter_list</span> Filter
            </button>
          </div>

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

          <!-- Static example cards -->
          <div class="glass-card rounded-xl p-0 overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] border-l-4 border-l-primary-fixed-dim">
            <div class="p-unit-md flex-grow">
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-primary-fixed text-on-primary-fixed px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">Understanding the Codebase</span>
              </div>
              <h3 class="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">Don't try to understand everything at once</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">Our monolithic architecture can be overwhelming. Start by tracing a single user request from the UI down to the database. Ignore side-effects and background jobs initially. Build your mental model vertically first, then horizontally.</p>
              <div class="flex items-center gap-3">
                <img alt="Author" class="w-6 h-6 rounded-full object-cover"
                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmhljbJWfrSRVgmxeE_ahhH9bkKmg45NuRLxZFyF-R4oQ1ZJ1aUhBTSCAXUfpCD9Zw-HN42h67dfV0IzyJGY_YdOHSy_f2r4T5JOYfrsLr42OXsb8rnDnDSPVuYvhBOLilHOuixf48jEiiGb-sE5yc4tHkCI3puklzS83fLZhuVdy9WxmqfnTa5mHNfCua9JQfcSiOAyjM85rOBxiLzoGGNpCp9q7i2q7rDI8quFojvSq14vZeQYrakrng0DQZanr5pgGPi7fhdA" />
                <span class="text-xs text-on-surface-variant">Shared by <span class="font-medium text-on-surface">David M.</span> &bull; Staff Engineer</span>
              </div>
            </div>
          </div>

          <div class="glass-card rounded-xl p-0 overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] border-l-4 border-l-tertiary-fixed-dim">
            <div class="p-unit-md flex-grow">
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">Networking Advice</span>
              </div>
              <h3 class="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2">Meeting Etiquette: The First 5 Minutes</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">When joining large virtual meetings, it's customary to remain on mute unless called upon, but always try to have your camera on for the first 5 minutes to establish a personal connection. Use the chat feature to introduce yourself if you're new to the group.</p>
              <div class="flex items-center gap-3">
                <img alt="Author" class="w-6 h-6 rounded-full object-cover"
                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmHVL0-x4EFs75HHLQZTWqPjJMdActkesWqdEEvW-8HHBHNYT253P9DWtiKCGGL1jQmvyy-vQES37KqhiYq60I1_0Md9Yii6RJKtwaPFvgBqz4c1TEDRV3iBzyIukMDh_F4jCMepy8ZTxmZZhHvU1pedC0A3eqqJrJ1KOneUNRfelbH4zbG12jvtJZOjRJwDp0laiJkGbeWPHa5moaw-CrjiFq9CbmZ2IBIqy-EYNHQ_Xcmq6ZrbD9pQRgzqrhF-Swl7zqExPyLg" />
                <span class="text-xs text-on-surface-variant">Shared by <span class="font-medium text-on-surface">Sarah J.</span> &bull; HR Partner</span>
              </div>
            </div>
            <div class="hidden md:block w-48 bg-surface-container-low relative">
              <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#0038b4 1px, transparent 1px); background-size: 16px 16px;"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="material-symbols-outlined text-6xl text-primary/30" style="font-variation-settings: 'FILL' 0;">groups</span>
              </div>
            </div>
          </div>

          <!-- Load More -->
          <div class="flex justify-center mt-4">
            <button class="text-primary font-label-md text-label-md hover:bg-surface-container px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-outline-variant/30">
              Load more discussions...
            </button>
          </div>
        </div>
      </div>
    </main>
  `
})
export class TipsComponent implements OnInit {
  posts: any[] = [
    {
      id: 1,
      title: 'First Week Setup',
      content: "Don't hesitate to ask questions. Everyone was a beginner once! Reach out to your assigned buddy for quick clarifications on internal jargon.",
      authorName: 'Sarah Johnson',
      postType: 'tip'
    },
    {
      id: 2,
      title: 'Code Review Best Practices',
      content: 'When reviewing code, focus on logic and maintainability first, style second. Always be constructive and ask questions rather than making demands.',
      authorName: 'Michael Chen',
      postType: 'tip'
    },
    {
      id: 3,
      title: 'Understanding Our Architecture',
      content: 'Start by tracing a single user request from the UI down to the database. Build your mental model vertically first, then horizontally.',
      authorName: 'Emily Rodriguez',
      postType: 'tip'
    },
    {
      id: 4,
      title: 'Meeting Etiquette',
      content: 'When joining large virtual meetings, remain on mute unless called upon, but try to have your camera on for the first 5 minutes to establish a personal connection.',
      authorName: 'David Martinez',
      postType: 'tip'
    },
    {
      id: 5,
      title: 'Documentation Tips',
      content: 'Always update the README when making architectural changes. Future you (and your teammates) will thank you for clear documentation.',
      authorName: 'Priya Sharma',
      postType: 'tip'
    }
  ];
  searchTerm = '';

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  get filteredPosts() {
    if (!this.searchTerm) return this.posts;
    const term = this.searchTerm.toLowerCase();
    return this.posts.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.content.toLowerCase().includes(term)
    );
  }

  ngOnInit() {}

  navigateToQna() {
    this.router.navigate(['/qna']);
  }
}