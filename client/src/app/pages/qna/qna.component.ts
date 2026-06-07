import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qna',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="flex-grow w-full max-w-container-max mx-auto px-gutter py-unit-xl">
      <!-- Header Section -->
      <div class="mb-unit-xl">
        <h1 class="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg mb-unit-sm text-on-surface">Q&A Forum</h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant">Ask questions. Get answers. Help others.</p>
      </div>

      <!-- Search & Ask Bar -->
      <div class="flex flex-col md:flex-row gap-unit-md mb-unit-xl">
        <div class="relative flex-grow">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            [(ngModel)]="searchTerm"
            class="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-shadow font-body-md text-body-md outline-none"
            placeholder="Search questions..."
            type="text"
          />
        </div>
        <button (click)="showAskForm = !showAskForm"
          class="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
          <span class="material-symbols-outlined text-[20px]">add</span>
          Ask Question
        </button>
      </div>

      <!-- Ask Question Form -->
      <div *ngIf="showAskForm" class="bg-surface-container-lowest rounded-lg p-unit-lg mb-unit-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/20">
        <h3 class="font-headline-sm text-headline-sm text-on-surface mb-4">Ask a New Question</h3>
        <input
          [(ngModel)]="newQuestion"
          class="w-full px-4 py-3 bg-surface border border-outline-variant/50 rounded-lg font-body-md text-body-md outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-4"
          placeholder="Type your question here..."
        />
        <div class="flex gap-3">
          <button (click)="addQuestion()" [disabled]="!newQuestion"
            class="bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded-lg transition-colors disabled:opacity-50">
            Submit Question
          </button>
          <button (click)="showAskForm = false"
            class="border border-outline-variant text-on-surface-variant font-label-md text-label-md px-6 py-2 rounded-lg hover:bg-surface-container transition-colors">
            Cancel
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <!-- Left Column: Questions List -->
        <div class="lg:col-span-8 flex flex-col gap-unit-lg">
          <!-- Tabs -->
          <div class="flex gap-unit-md border-b border-outline-variant/30 overflow-x-auto pb-1">
            <button class="font-label-md text-label-md text-primary border-b-2 border-primary pb-2 px-1 whitespace-nowrap">Recent</button>
            <button class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 px-1 whitespace-nowrap">Most Helpful</button>
            <button class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 px-1 whitespace-nowrap">Unanswered</button>
            <div class="mx-2 border-l border-outline-variant/30 h-4 self-center"></div>
            <button class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 px-1 whitespace-nowrap">All Topics</button>
            <button class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 px-1 whitespace-nowrap">Tool Related</button>
            <button class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 px-1 whitespace-nowrap">HR</button>
            <button class="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors pb-2 px-1 whitespace-nowrap">Process</button>
          </div>

          <!-- Dynamic Question Cards -->
          <div class="flex flex-col gap-unit-md">
            <div *ngFor="let q of filteredList" class="bg-surface-container-lowest rounded-lg p-unit-md shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex gap-unit-md transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
              <!-- Upvotes -->
              <div class="flex flex-col items-center gap-1 min-w-[40px] text-on-surface-variant">
                <button class="hover:text-primary transition-colors"><span class="material-symbols-outlined text-[20px]">keyboard_arrow_up</span></button>
                <span class="font-label-md text-label-md font-bold text-on-surface">0</span>
                <button class="hover:text-primary transition-colors"><span class="material-symbols-outlined text-[20px]">keyboard_arrow_down</span></button>
              </div>
              <!-- Content -->
              <div class="flex-grow flex flex-col gap-unit-sm">
                <div class="flex justify-between items-start gap-4">
                  <h3 class="font-headline-sm text-headline-sm text-on-surface leading-tight">{{ q.question }}</h3>
                  <div *ngIf="q.answer" class="bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">check_circle</span> Solved
                  </div>
                  <div *ngIf="!q.answer" class="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded-full whitespace-nowrap">
                    Pending Answer
                  </div>
                </div>

                <!-- Answer display -->
                <div *ngIf="q.answer" class="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                  <strong class="text-on-surface">A:</strong> {{ q.answer }}
                </div>

                <!-- Answer input -->
                <div *ngIf="!q.answer" class="flex gap-2 mt-1">
                  <input
                    [(ngModel)]="answerInputs[q.id]"
                    placeholder="Type your answer..."
                    class="flex-grow px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg font-body-sm text-body-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <button (click)="submitAnswer(q.id)" [disabled]="!answerInputs[q.id]"
                    class="bg-primary text-on-primary font-label-sm text-label-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap">
                    Answer
                  </button>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-unit-sm mt-2">
                  <div class="flex gap-2">
                    <span class="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded">General</span>
                  </div>
                  <div class="flex items-center gap-2 text-on-surface-variant">
                    <button (click)="remove(q.id)" class="text-error hover:text-on-error-container font-label-sm text-label-sm flex items-center gap-1 transition-colors">
                      <span class="material-symbols-outlined text-[16px]">delete</span> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty state -->
            <div *ngIf="filteredList.length === 0" class="text-center py-unit-xl text-on-surface-variant">
              <span class="material-symbols-outlined text-[48px] text-outline-variant mb-4">forum</span>
              <p class="font-body-lg text-body-lg">No questions yet. Be the first to ask!</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="lg:col-span-4 flex flex-col gap-gutter">
          <!-- Ask Anonymously CTA -->
          <div class="bg-surface-container-low rounded-lg p-unit-md border border-outline-variant/30 text-center flex flex-col items-center">
            <span class="material-symbols-outlined text-[32px] text-primary mb-2">visibility_off</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface mb-1">Ask Anonymously</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant mb-4">Feel free to ask questions without your name attached.</p>
            <button (click)="showAskForm = true"
              class="border border-primary text-primary font-label-md text-label-md px-4 py-2 rounded shadow-sm hover:bg-primary hover:text-on-primary transition-colors w-full">
              Ask Question
            </button>
          </div>
        </div>
      </div>
    </main>
  `
})
export class QnaComponent implements OnInit {
  qnaList: any[] = [
    {
      id: '1',
      question: 'How do I get access to GitHub Enterprise?',
      answer: 'Submit a ticket through the IT Support portal. Access is usually granted within 24 hours. Make sure to include your team name and manager approval.',
      category: 'Tool Related'
    },
    {
      id: '2',
      question: 'What is the code review process?',
      answer: 'All PRs require at least 2 approvals from team members. Reviews should be completed within 24 hours. Use conventional commits and ensure all CI checks pass.',
      category: 'Process'
    },
    {
      id: '3',
      question: 'How do I request absence or time off?',
      answer: 'Navigate to Workday and select "Request Time Off". Fill in the details of your absence request and submit. Your manager will be automatically notified and will approve or deny the request.',
      category: 'HR'
    },
    {
      id: '4',
      question: 'Where can I find the API documentation?',
      answer: 'API documentation is available on Confluence under the Engineering section. You can also find interactive API docs at the /swagger endpoint of each service.',
      category: 'Tool Related'
    },
    {
      id: '5',
      question: 'What are the team stand-up times?',
      answer: 'Daily stand-ups are held at 9:30 AM local time. Check your team calendar for the specific meeting link and any timezone adjustments.',
      category: 'Process'
    },
    {
      id: '6',
      question: 'How do I set up my development environment?',
      answer: 'Follow the onboarding guide on Confluence which includes installing required tools, configuring your IDE, and cloning necessary repositories. Your buddy can help if you encounter any issues.',
      category: 'Tool Related'
    },
    {
      id: '7',
      question: 'What is the dress code?',
      answer: 'We have a business casual dress code. Jeans and casual shirts are acceptable. For client meetings or important presentations, business professional attire is recommended.',
      category: 'HR'
    },
    {
      id: '8',
      question: 'How do I report a bug or technical issue?',
      answer: 'Create a ticket in Jira under your project board. Include steps to reproduce, expected vs actual behavior, and any relevant screenshots or logs. Tag it with the appropriate priority level.',
      category: 'Process'
    },
    {
      id: '9',
      question: 'Where can I find my pay stubs and tax documents?',
      answer: 'Access Workday and navigate to the "Pay" section. All pay stubs, tax forms (W-2, 1099), and benefits information are available there.',
      category: 'HR'
    },
    {
      id: '10',
      question: 'How do I get VPN access for remote work?',
      answer: 'Submit a request through the IT Support portal. You will receive VPN credentials and installation instructions via email within 1-2 business days.',
      category: 'Tool Related'
    },
    {
      id: '11',
      question: 'What training resources are available?',
      answer: 'Access the Learning Platform for online courses, certifications, and training materials. The company also offers reimbursement for external courses with manager approval.',
      category: 'HR'
    },
    {
      id: '12',
      question: 'How do I schedule a meeting room?',
      answer: 'Use Outlook or Google Calendar to book meeting rooms. Search for available rooms by location and capacity, then add them to your meeting invite.',
      category: 'Process'
    },
    {
      id: '13',
      question: 'What is the policy for working from home?',
      answer: 'Most teams follow a hybrid model with 2-3 days in office per week. Check with your manager for your team\'s specific policy and coordinate with your team for in-office days.',
      category: 'HR'
    },
    {
      id: '14',
      question: 'How do I submit an expense report?',
      answer: 'Log into the expense management system (Concur), upload receipts, categorize expenses, and submit for approval. Most reports are processed within 5-7 business days.',
      category: 'HR'
    },
    {
      id: '15',
      question: 'Who should I contact for IT support?',
      answer: 'For urgent issues, call the IT Help Desk. For non-urgent requests, submit a ticket through the IT Support portal or email support@company.com.',
      category: 'Tool Related'
    },
    {
      id: '16',
      question: 'How do I access company benefits information?',
      answer: 'All benefits information including health insurance, 401k, and other perks are available in Workday under the Benefits section. Contact HR for specific questions.',
      category: 'HR'
    },
    {
      id: '17',
      question: 'What is the sprint/release cycle?',
      answer: 'We follow 2-week sprints with sprint planning on Mondays and retrospectives on Fridays. Releases to production typically happen at the end of each sprint.',
      category: 'Process'
    },
    {
      id: '18',
      question: 'How do I request new software or tools?',
      answer: 'Submit a software request through the IT portal with business justification. Standard tools are approved quickly, while specialized software may require manager and security approval.',
      category: 'Tool Related'
    }
  ];
  newQuestion = '';
  searchTerm = '';
  answerInputs: { [id: string]: string } = {};
  showAskForm = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  get filteredList() {
    if (!this.searchTerm) return this.qnaList;
    const term = this.searchTerm.toLowerCase();
    return this.qnaList.filter(q =>
      q.question.toLowerCase().includes(term) ||
      (q.answer && q.answer.toLowerCase().includes(term))
    );
  }

  addQuestion() {
    if (this.newQuestion.trim()) {
      this.qnaList.push({
        id: String(this.qnaList.length + 1),
        question: this.newQuestion,
        answer: '',
        category: 'General'
      });
      this.newQuestion = '';
      this.showAskForm = false;
      this.cdr.markForCheck();
    }
  }

  submitAnswer(id: string) {
    const item = this.qnaList.find(q => q.id === id);
    if (item && this.answerInputs[id]) {
      item.answer = this.answerInputs[id];
      delete this.answerInputs[id];
      this.cdr.markForCheck();
    }
  }

  remove(id: string) {
    this.qnaList = this.qnaList.filter(q => q.id !== id);
    this.cdr.markForCheck();
  }
}