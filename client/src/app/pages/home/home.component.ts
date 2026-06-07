import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
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
            <button class="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg transition-colors shadow-sm">
              Get Started
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
          <a class="bg-surface-container-lowest rounded-lg p-unit-md flex flex-col items-center justify-center gap-3 ambient-shadow hover-lift border border-transparent hover:border-primary/20 text-center" href="#">
            <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">checklist</span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface">First Month Checklist</span>
          </a>
          <a class="bg-surface-container-lowest rounded-lg p-unit-md flex flex-col items-center justify-center gap-3 ambient-shadow hover-lift border border-transparent hover:border-primary/20 text-center" routerLink="/tips">
            <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">menu_book</span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface">Survival Guide</span>
          </a>
          <a class="bg-surface-container-lowest rounded-lg p-unit-md flex flex-col items-center justify-center gap-3 ambient-shadow hover-lift border border-transparent hover:border-primary/20 text-center" routerLink="/questions">
            <div class="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">groups</span>
            </div>
            <span class="font-label-sm text-label-sm text-on-surface">Peer Sessions</span>
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
            <span class="font-label-sm text-label-sm text-primary bg-primary/10 px-3 py-1 rounded-full">Week 1 of 4</span>
          </div>
          <div class="flex-grow flex flex-col justify-center gap-6">
            <!-- Progress Timeline -->
            <div class="relative flex justify-between items-start">
              <div class="absolute top-3 left-0 w-full h-1 bg-surface-container-highest rounded-full -z-10"></div>
              <div class="absolute top-3 left-0 w-1/4 h-1 bg-primary rounded-full -z-10 transition-all duration-500"></div>
              <div class="flex flex-col items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center border-4 border-surface-container-lowest">
                  <span class="material-symbols-outlined text-[14px]">check</span>
                </div>
                <span class="font-label-sm text-label-sm text-on-surface">Week 1</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Accounts &amp; Setup</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-surface-container-highest border-2 border-primary text-primary flex items-center justify-center border-4 border-surface-container-lowest">
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <span class="font-label-sm text-label-sm text-on-surface font-bold">Week 2</span>
                <span class="font-body-sm text-body-sm text-on-surface-variant text-[10px]">Tools &amp; Training</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-surface-container-lowest"></div>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Week 3</span>
                <span class="font-body-sm text-body-sm text-outline-variant text-[10px]">Team Integration</span>
              </div>
              <div class="flex flex-col items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center border-4 border-surface-container-lowest"></div>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Week 4</span>
                <span class="font-body-sm text-body-sm text-outline-variant text-[10px]">Independence</span>
              </div>
            </div>
            <div class="mt-4 p-4 bg-surface-container rounded-lg border border-outline-variant/30">
              <h4 class="font-label-md text-label-md text-on-surface mb-2">Current Focus: Tools &amp; Training</h4>
              <ul class="space-y-2">
                <li class="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
                  <span class="material-symbols-outlined text-primary text-[16px]">radio_button_unchecked</span>
                  Complete Mandatory Security Training
                </li>
                <li class="flex items-center gap-2 font-body-sm text-body-sm text-on-surface">
                  <span class="material-symbols-outlined text-primary text-[16px]">radio_button_unchecked</span>
                  Set up Developer Environment
                </li>
              </ul>
              <button class="mt-4 text-primary font-label-sm text-label-sm hover:underline">View Full Checklist</button>
            </div>
          </div>
        </div>

        <!-- Upcoming Peer Sessions -->
        <div class="flex-1 bg-surface-container-lowest rounded-xl ambient-shadow p-unit-lg flex flex-col">
          <div class="flex justify-between items-center mb-6">
            <h2 class="font-headline-sm text-headline-sm text-on-surface">Upcoming Peer Sessions</h2>
            <a class="font-label-sm text-label-sm text-primary hover:underline" routerLink="/questions">View all</a>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between p-4 rounded-lg hover:bg-surface-container transition-colors border border-outline-variant/30">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-surface-variant overflow-hidden flex-shrink-0">
                  <img alt="Session host avatar" class="w-full h-full object-cover"
                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9lIKmWlCi9vzF0C1DQK8P5BeTO0bNyc-mpClyAiWZzmePTjDm0NWTf8kUuiJdk91p3tncXGqPqpxPNmmWnabrgTsb432lyrijYAmei-uoLKSv3bN4X8LoD7SAdyzbO3L5rzcbga8pu26auQwvIGbITRydth6vSRlVJyECPFOTOPxLAQJGapdwlYVw3JUAcSoFjJsUxVdwnY8iJ60UAw_71LBfociVb8BMLIZCJMrHACLMke_GGPE8pE31ArsroIWGqKssDSQycQ" />
                </div>
                <div>
                  <h3 class="font-label-md text-label-md text-on-surface">Tool Walkthrough</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant text-xs">by Senior Graduate</p>
                  <p class="font-body-sm text-body-sm text-on-surface-variant text-xs mt-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">calendar_today</span>
                    Fri, 24 May &bull; 4:00 PM
                  </p>
                </div>
              </div>
              <button class="bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                Join
              </button>
            </div>
            <div class="flex items-center justify-between p-4 rounded-lg hover:bg-surface-container transition-colors border border-outline-variant/30">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-surface-variant overflow-hidden flex-shrink-0">
                  <img alt="Session host avatar" class="w-full h-full object-cover"
                       src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6WjgG8N1dZFj6_lEGwen7J9b5dqzp0gA7Y-RAuP-V7yNj9GEy9jFqCdiwqzNs_fjAIPPIGfryPA-VQ_iFJcu_6Y4mdYskbd92bYmUqH-KWFefJeXqyRkkWo_H9jT6bdb3t7nl38rTKeKDyIcL9L6yRT015kfPjjCLce0evUI5WOAhKCBLR5ZLtDnrKsEI1n-udW_8lH6cjR13O646X5I8HQZvoEVnW0sTshkzwzDP4wKe6JTxP71IiidzK-6CESSQLmZDpqZSZA" />
                </div>
                <div>
                  <h3 class="font-label-md text-label-md text-on-surface">Ask Me Anything</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant text-xs">by Peer Mentor</p>
                  <p class="font-body-sm text-body-sm text-on-surface-variant text-xs mt-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">calendar_today</span>
                    Wed, 29 May &bull; 5:00 PM
                  </p>
                </div>
              </div>
              <button class="border border-primary text-primary hover:bg-primary/5 font-label-sm text-label-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
                Register
              </button>
            </div>
          </div>
        </div>

      </section>
    </main>
  `
})
export class HomeComponent {}