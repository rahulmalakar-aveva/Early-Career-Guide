import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChecklistItem {
  label: string;
  done: boolean;
}

interface ChecklistWeek {
  week: string;
  theme: string;
  icon: string;
  items: ChecklistItem[];
}

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl flex flex-col gap-unit-xl">

      <!-- Header -->
      <div>
        <h1 class="font-display-lg text-display-lg text-primary mb-2">First Month Checklist</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant">Everything you need to complete in your first four weeks at AVEVA.</p>
      </div>

      <!-- Progress bar -->
      <div class="w-full bg-surface-container rounded-full h-3 overflow-hidden">
        <div class="h-3 bg-primary rounded-full transition-all duration-500"
             [style.width.%]="overallProgress"></div>
      </div>
      <p class="font-label-sm text-label-sm text-on-surface-variant -mt-4">
        {{ completedCount }} of {{ totalCount }} tasks completed ({{ overallProgress }}%)
      </p>

      <!-- Weeks -->
      <div class="flex flex-col gap-unit-lg">
        <div *ngFor="let week of weeks"
             class="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">

          <!-- Week header -->
          <div class="flex items-center gap-4 px-unit-md py-4 border-b border-outline-variant/20 bg-surface-container/40">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <span class="material-symbols-outlined text-[22px]">{{ week.icon }}</span>
            </div>
            <div class="flex-grow">
              <h2 class="font-headline-sm text-headline-sm text-on-surface font-semibold">{{ week.week }}</h2>
              <p class="font-body-sm text-body-sm text-on-surface-variant">{{ week.theme }}</p>
            </div>
            <span class="font-label-sm text-label-sm text-primary font-medium">
              {{ doneCount(week) }}/{{ week.items.length }}
            </span>
          </div>

          <!-- Items -->
          <ul class="divide-y divide-outline-variant/10">
            <li *ngFor="let item of week.items"
                (click)="item.done = !item.done"
                class="flex items-center gap-4 px-unit-md py-3 cursor-pointer hover:bg-surface-container/50 transition-colors select-none">
              <div [class]="item.done
                    ? 'w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0'
                    : 'w-5 h-5 rounded-full border-2 border-outline-variant flex-shrink-0'">
                <span *ngIf="item.done" class="material-symbols-outlined text-on-primary text-[14px]">check</span>
              </div>
              <span [class]="item.done
                    ? 'font-body-md text-body-md text-on-surface-variant line-through'
                    : 'font-body-md text-body-md text-on-surface'">
                {{ item.label }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  `
})
export class ChecklistComponent {
  weeks: ChecklistWeek[] = [
    {
      week: 'Week 1',
      theme: 'New Hire Orientation',
      icon: 'waving_hand',
      items: [
        { label: 'Attend new hire orientation session', done: false },
        { label: 'Meet your onboarding buddy', done: false },
        { label: 'Set up your AVEVA email and accounts', done: false },
        { label: 'Complete IT setup (laptop, VPN, tools)', done: false },
        { label: 'Read and sign the employee handbook', done: false },
        { label: 'Join the Early Careers Teams channel', done: false },
        { label: 'Complete mandatory compliance training', done: false },
      ],
    },
    {
      week: 'Week 2',
      theme: 'Knowing AVEVA & Culture',
      icon: 'business',
      items: [
        { label: 'Explore the AVEVA company mission and values', done: false },
        { label: 'Watch the AVEVA product overview videos', done: false },
        { label: 'Schedule 1:1 intro meetings with your team', done: false },
        { label: 'Attend your first team stand-up or meeting', done: false },
        { label: 'Join a Culture & Inclusion session', done: false },
        { label: 'Set up your profile on the internal directory', done: false },
        { label: 'Define your learning goals for the first quarter', done: false },
      ],
    },
    {
      week: 'Week 3',
      theme: 'Tools & Training',
      icon: 'build',
      items: [
        { label: 'Complete role-specific tool training', done: false },
        { label: 'Finish the security awareness training', done: false },
        { label: 'Try a hands-on exercise with your main tool', done: false },
        { label: 'Shadow a more experienced teammate for a day', done: false },
        { label: 'Practise your daily workflows end-to-end', done: false },
        { label: 'Ask for early feedback from your manager', done: false },
        { label: 'Log any blockers or questions in the Q&A page', done: false },
      ],
    },
    {
      week: 'Week 4',
      theme: 'Team Integration & Setup',
      icon: 'groups',
      items: [
        { label: 'Own and deliver a small starter task', done: false },
        { label: 'Confirm all recurring meetings are in your calendar', done: false },
        { label: 'Review your onboarding progress with your manager', done: false },
        { label: 'Update your development plan for month 2+', done: false },
        { label: 'Plan your goals and milestones for the next quarter', done: false },
        { label: 'Connect with at least two other early career peers', done: false },
        { label: 'Celebrate completing your first month!', done: false },
      ],
    },
  ];

  get totalCount(): number {
    return this.weeks.reduce((sum, w) => sum + w.items.length, 0);
  }

  get completedCount(): number {
    return this.weeks.reduce((sum, w) => sum + w.items.filter(i => i.done).length, 0);
  }

  get overallProgress(): number {
    return this.totalCount === 0 ? 0 : Math.round((this.completedCount / this.totalCount) * 100);
  }

  doneCount(week: ChecklistWeek): number {
    return week.items.filter(i => i.done).length;
  }
}
