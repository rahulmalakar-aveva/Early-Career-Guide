import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <!-- TopNavBar -->
    <header class="bg-on-surface fixed w-full top-0 h-16 shadow-md z-50">
      <div class="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-full">
        <div class="flex items-center gap-unit-xl">
          <a class="font-headline-md text-headline-md font-bold text-surface-bright flex items-center gap-2" routerLink="/">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">work</span>
            Early Career Portal
          </a>
          <nav class="hidden md:flex gap-unit-lg h-full items-center">
            <a routerLink="/" routerLinkActive="border-b-2 border-secondary-fixed pb-1 font-bold opacity-90" [routerLinkActiveOptions]="{exact: true}"
               class="text-surface-variant/80 hover:text-surface-bright transition-colors font-label-md text-label-md hover:bg-surface-variant/10 px-2 py-1 rounded">Home</a>
            <a routerLink="/tips" routerLinkActive="border-b-2 border-secondary-fixed pb-1 font-bold opacity-90"
               class="text-surface-variant/80 hover:text-surface-bright transition-colors font-label-md text-label-md hover:bg-surface-variant/10 px-2 py-1 rounded">Survival Guide</a>
            <a routerLink="/links" routerLinkActive="border-b-2 border-secondary-fixed pb-1 font-bold opacity-90"
               class="text-surface-variant/80 hover:text-surface-bright transition-colors font-label-md text-label-md hover:bg-surface-variant/10 px-2 py-1 rounded">Resources</a>
            <a routerLink="/questions" routerLinkActive="border-b-2 border-secondary-fixed pb-1 font-bold opacity-90"
               class="text-surface-variant/80 hover:text-surface-bright transition-colors font-label-md text-label-md hover:bg-surface-variant/10 px-2 py-1 rounded">Peer Sessions</a>
            <a routerLink="/qna" routerLinkActive="border-b-2 border-secondary-fixed pb-1 font-bold opacity-90"
               class="text-surface-variant/80 hover:text-surface-bright transition-colors font-label-md text-label-md hover:bg-surface-variant/10 px-2 py-1 rounded">Q&A</a>
          </nav>
        </div>
        <div class="flex items-center gap-unit-md text-surface-bright">
          <button class="hover:bg-surface-variant/10 p-2 rounded-full transition-colors flex items-center justify-center">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button class="hover:bg-surface-variant/10 p-2 rounded-full transition-colors flex items-center justify-center">
            <span class="material-symbols-outlined">help</span>
          </button>
          <div class="w-8 h-8 rounded-full bg-surface-variant overflow-hidden ml-2 cursor-pointer border-2 border-surface-bright/20 hover:border-surface-bright/50 transition-colors">
            <img alt="User profile avatar" class="w-full h-full object-cover"
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuDemTNEBdDJaM5l9PlGxHq18KRPCEDXt5rnvcJ8sooqRWo6Mrc0LcT8K7HCFsKpvdYnXyVzQMFQJp0I6Kg3YDoCKj57iBlUWl_rjpuNKgceDSuyX2O26xajQ2K2msUSrjVd0igFpzSB8GPk0WzA5gHtRdZnYDCWy0-VfQCjG5xcRicvloPuqCwyefZDrIKS-YmWDDLqcHodKEhORrrklmkW_6ULP49bxYrWJaShYNGU7oUeBJfUhJKEtkApQi31g-9f11OoHTHqVg" />
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content (offset for fixed header) -->
    <div class="pt-16 flex-grow flex flex-col min-h-screen">
      <router-outlet></router-outlet>
    </div>

    <!-- Footer -->
    <footer class="bg-surface-container-lowest w-full py-unit-xl mt-unit-xl border-t border-outline-variant/30">
      <div class="flex flex-col md:flex-row justify-between items-center w-full px-gutter max-w-container-max mx-auto gap-unit-md">
        <div class="flex flex-col items-center md:items-start gap-2">
          <span class="font-headline-sm text-headline-sm font-black text-on-surface flex items-center gap-2">
            <span class="material-symbols-outlined">work</span> Early Career Portal
          </span>
          <p class="font-body-sm text-body-sm text-primary text-center md:text-left">
            © 2024 Early Career Portal. Empowering the next generation of talent.
          </p>
        </div>
        <nav class="flex flex-wrap justify-center gap-4 font-label-sm text-label-sm">
          <a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">Privacy Policy</a>
          <a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">Terms of Service</a>
          <a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">Accessibility</a>
          <a class="text-on-surface-variant hover:text-primary underline transition-all" href="#">Feedback</a>
        </nav>
      </div>
    </footer>
  `
})
export class App {}