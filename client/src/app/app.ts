import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, FormsModule],
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
            @if (adminService.isAdmin()) {
              <a routerLink="/admin" routerLinkActive="border-b-2 border-secondary-fixed pb-1 font-bold opacity-90"
                 class="text-yellow-300 hover:text-yellow-100 transition-colors font-label-md text-label-md hover:bg-surface-variant/10 px-2 py-1 rounded flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]" style="font-variation-settings: 'FILL' 1;">shield_person</span>
                Admin
              </a>
            }
        </nav>
        </div>

        <!-- Admin toggle area -->
        <div class="flex items-center gap-2">
          @if (adminService.isAdmin()) {
            <span class="hidden sm:flex items-center gap-1.5 bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 font-label-sm text-label-sm px-3 py-1.5 rounded-full">
              <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">shield_person</span>
              Admin Mode
            </span>
            <button (click)="adminService.logout()"
                    class="p-2 rounded-full text-surface-variant/80 hover:text-surface-bright hover:bg-surface-variant/10 transition-colors"
                    title="Exit Admin Mode">
              <span class="material-symbols-outlined text-[20px]">lock_open</span>
            </button>
          } @else {
            <button (click)="showLoginModal = true"
                    class="p-2 rounded-full text-surface-variant/80 hover:text-surface-bright hover:bg-surface-variant/10 transition-colors"
                    title="Admin Login">
              <span class="material-symbols-outlined text-[20px]">lock</span>
            </button>
          }
        </div>
      </div>
    </header>

    <!-- Admin Login Modal -->
    @if (showLoginModal) {
      <div class="fixed inset-0 z-[200] flex items-center justify-center">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" (click)="closeModal()"></div>
        <div class="relative bg-surface-container-lowest rounded-2xl p-8 shadow-2xl border border-outline-variant/30 w-full max-w-sm mx-4 flex flex-col gap-6">
          <div class="flex flex-col items-center gap-3">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary text-[32px]" style="font-variation-settings: 'FILL' 1;">shield_person</span>
            </div>
            <h2 class="font-headline-sm text-headline-sm text-on-surface text-center">Admin Access</h2>
            <p class="font-body-sm text-body-sm text-on-surface-variant text-center">Enter the admin password to manage portal content.</p>
          </div>
          <div class="flex flex-col gap-3">
            <input
              [(ngModel)]="adminPassword"
              type="password"
              placeholder="Enter password"
              (keydown.enter)="tryLogin()"
              class="px-4 py-3 bg-surface border border-outline-variant/50 rounded-lg font-body-md text-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              [class.border-error]="loginError"
            />
            @if (loginError) {
              <p class="font-body-sm text-body-sm text-error flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">error</span>
                Incorrect password. Please try again.
              </p>
            }
          </div>
          <div class="flex gap-3">
            <button (click)="closeModal()"
                    class="flex-1 border border-outline-variant text-on-surface-variant font-label-md text-label-md px-4 py-3 rounded-lg hover:bg-surface-container transition-colors">
              Cancel
            </button>
            <button (click)="tryLogin()"
                    class="flex-1 bg-primary text-on-primary font-label-md text-label-md px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
    }

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
            © 2026 Early Career Portal. Empowering the next generation of talent.
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
export class App {
  showLoginModal = false;
  adminPassword = '';
  loginError = false;

  constructor(public adminService: AdminService) {}

  tryLogin() {
    const success = this.adminService.login(this.adminPassword);
    if (success) {
      this.closeModal();
    } else {
      this.loginError = true;
    }
  }

  closeModal() {
    this.showLoginModal = false;
    this.adminPassword = '';
    this.loginError = false;
  }
}