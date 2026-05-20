import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="flex-grow w-full px-gutter max-w-container-max mx-auto py-unit-xl">
      <!-- Header Section -->
      <div class="mb-10">
        <h1 class="font-headline-lg text-headline-lg text-on-surface mb-2">Resources</h1>
        <p class="font-body-md text-body-md text-on-surface-variant">Access helpful documents, links and internal resources.</p>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar / Categories -->
        <aside class="w-full md:w-64 flex-shrink-0">
          <h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4 px-3">Categories</h3>
          <nav class="space-y-1">
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container text-primary font-medium transition-colors cursor-pointer">
              <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">folder</span>
              <span class="font-body-sm text-body-sm">All Resources</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
              <span class="material-symbols-outlined">rocket_launch</span>
              <span class="font-body-sm text-body-sm">Getting Started</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
              <span class="material-symbols-outlined">build</span>
              <span class="font-body-sm text-body-sm">Tools &amp; Systems</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
              <span class="material-symbols-outlined">policy</span>
              <span class="font-body-sm text-body-sm">HR &amp; Policies</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
              <span class="material-symbols-outlined">rule_folder</span>
              <span class="font-body-sm text-body-sm">Process &amp; Guidelines</span>
            </a>
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
              <span class="material-symbols-outlined">school</span>
              <span class="font-body-sm text-body-sm">Training &amp; Learning</span>
            </a>
          </nav>
        </aside>

        <!-- Resources Grid -->
        <div class="flex-grow">
          <!-- Search Bar -->
          <div class="mb-8 relative">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              [(ngModel)]="searchTerm"
              class="w-full pl-12 pr-4 py-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
              placeholder="Search resources..."
              type="text"
            />
          </div>

          <!-- Dynamic Cards from API -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let l of filteredLinks$ | async"
                 class="bg-surface-container-lowest rounded-lg p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/20 flex flex-col h-full hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer group">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span class="material-symbols-outlined text-3xl">link</span>
                </div>
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 group-hover:text-primary transition-colors">{{ l.title }}</h3>
                  <p *ngIf="l.description" class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{{ l.description }}</p>
                </div>
              </div>
              <div class="mt-auto pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span class="font-label-md text-label-md text-primary">View Resource</span>
                <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            <!-- Static resource cards -->
            <div class="bg-surface-container-lowest rounded-lg p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/20 flex flex-col h-full hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer group">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span class="material-symbols-outlined text-3xl">menu_book</span>
                </div>
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 group-hover:text-primary transition-colors">Onboarding Guide</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Your complete guide to surviving and thriving in your first 30 days.</p>
                </div>
              </div>
              <div class="mt-auto pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span class="font-label-md text-label-md text-primary">View Resource</span>
                <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            <div class="bg-surface-container-lowest rounded-lg p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/20 flex flex-col h-full hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer group">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
                  <span class="material-symbols-outlined text-3xl">corporate_fare</span>
                </div>
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 group-hover:text-primary transition-colors">Company Handbook</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Our mission, values, and the rules of the road for all employees.</p>
                </div>
              </div>
              <div class="mt-auto pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span class="font-label-md text-label-md text-primary">View Resource</span>
                <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            <div class="bg-surface-container-lowest rounded-lg p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/20 flex flex-col h-full hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer group">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary-container shrink-0">
                  <span class="material-symbols-outlined text-3xl">badge</span>
                </div>
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 group-hover:text-primary transition-colors">HR Portal</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Manage your benefits, time off, and payroll information.</p>
                </div>
              </div>
              <div class="mt-auto pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span class="font-label-md text-label-md text-primary">View Resource</span>
                <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>

            <div class="bg-surface-container-lowest rounded-lg p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/20 flex flex-col h-full hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer group">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container shrink-0">
                  <span class="material-symbols-outlined text-3xl">laptop_mac</span>
                </div>
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 group-hover:text-primary transition-colors">IT Support</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">Submit tickets for hardware or software issues.</p>
                </div>
              </div>
              <div class="mt-auto pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span class="font-label-md text-label-md text-primary">View Resource</span>
                <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class LinksComponent {
  links$: Observable<any[]>;
  searchTerm = '';

  get filteredLinks$() {
    return this.links$;
  }

  constructor(private api: ApiService) {
    this.links$ = this.api.getLinks();
  }
}