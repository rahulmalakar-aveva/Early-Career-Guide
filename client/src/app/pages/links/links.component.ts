import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl">
      <!-- Header Section -->
      <div class="mb-10">
        <h1 class="font-display-lg text-display-lg text-primary mb-2">Resources</h1>
        <p class="font-body-md text-body-md text-on-surface-variant">Access helpful documents, links and internal resources.</p>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar / Categories -->
        <aside class="w-full md:w-64 flex-shrink-0">
          <h3 class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4 px-3">Categories</h3>
          <nav class="space-y-1">
            <a (click)="selectedCategory = ''" [class]="selectedCategory === '' ? 'flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container text-primary font-medium transition-colors cursor-pointer' : 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer'">
              <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">folder</span>
              <span class="font-body-sm text-body-sm">All Resources</span>
            </a>
            @for (cat of categories; track cat) {
              <a (click)="selectedCategory = cat" [class]="selectedCategory === cat ? 'flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container text-primary font-medium transition-colors cursor-pointer' : 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer'">
                <span class="material-symbols-outlined">link</span>
                <span class="font-body-sm text-body-sm">{{ cat }}</span>
              </a>
            }
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

          @if (loading) {
            <div class="flex items-center justify-center py-16 text-on-surface-variant">
              <span class="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
            </div>
          }

          <!-- Dynamic Cards from API -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a *ngFor="let l of filteredLinks"
                 [href]="l.url"
                 target="_blank"
                 class="bg-surface-container-lowest rounded-lg p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/20 flex flex-col h-full hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer group">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span class="material-symbols-outlined text-3xl">link</span>
                </div>
                <div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface mb-1 group-hover:text-primary transition-colors">{{ l.title }}</h3>
                  <p *ngIf="l.description" class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{{ l.description }}</p>
                  <span *ngIf="l.category" class="inline-block mt-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{{ l.category }}</span>
                </div>
              </div>
              <div class="mt-auto pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                <span class="font-label-md text-label-md text-primary">View Resource</span>
                <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </a>
          </div>

          @if (!loading && filteredLinks.length === 0) {
            <div class="text-center py-16 text-on-surface-variant">
              <span class="material-symbols-outlined text-[48px] text-outline-variant mb-4 block">link_off</span>
              <p class="font-body-lg text-body-lg">No resources found.</p>
            </div>
          }
        </div>
      </div>
    </main>
  `
})
export class LinksComponent implements OnInit {
  links: any[] = [];
  searchTerm = '';
  selectedCategory = '';
  loading = false;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  get categories(): string[] {
    const cats = [...new Set(this.links.map(l => l.category).filter(Boolean))];
    return cats.sort();
  }

  get filteredLinks() {
    return this.links.filter(link => {
      const matchesCat = !this.selectedCategory || link.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm ||
        link.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        link.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        link.category?.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }

  ngOnInit() {
    this.loading = true;
    this.api.getLinks().subscribe({
      next: (data) => { this.links = data; this.loading = false; this.cdr.markForCheck(); },
      error: () => { this.loading = false; this.cdr.markForCheck(); }
    });
  }
}