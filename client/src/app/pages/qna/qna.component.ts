import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

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
          <!-- Top Contributors Widget -->
          <div class="bg-surface-container-lowest rounded-lg p-unit-md shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-outline-variant/20">
            <h3 class="font-headline-sm text-headline-sm text-on-surface mb-unit-md">Top Contributors</h3>
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <img alt="Alec Johnson avatar" class="w-10 h-10 rounded-full"
                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjQOI9NKxTBNB9e2jVWY_9nKAtPutyMF656qMVzKlbgI-hhm1FJYJzzRIbUVegSwTRf2lg0L1CCUsHnjSvURD0x1ibdM-U1zyOZjb6YmmnH-gas-kT87WIs7b4ex73dtIUY5_62vc1wtIkDQEYBIvGcpIuGoCEczWIFbtT6im5PmBjnDmnHv9Y19M_U-HPUecUy1M2WbNUT5amrmQS-WYfxoyrLW1WcNLo1Hwkq8uOon60evs-8Xxm5YnmRCFMRdUxV3cIbjGlTw" />
                <div>
                  <p class="font-label-md text-label-md text-on-surface">Alec Johnson</p>
                  <p class="font-label-sm text-label-sm text-on-surface-variant">Senior Engineer &bull; 42 answers</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <img alt="Priya Sharma avatar" class="w-10 h-10 rounded-full"
                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuALNpdt0DGhjCsprd5_fEb2i2DgSwwhhNULAh066qJo2PFb74vbxgJbHq4guzUskaHoQcz25JR7RVEXmDZ0Sys6vSKw_-lbuRpYfjwZYU25rw3p9uuNmVnon4jQfSLzPcrQ_AW8sf6gPO_T0vvwAyKgqBqGqnXsyfdqcFZ2ebBfXQbqmkofxujb6ksUi6EfRkGB-b9Y6DDmOTKlbTvSbEsiptwueZwibZVUqiQ6nT3c7V8O7I71kC2egGkruhP4gj-wIgsrtoBHlA" />
                <div>
                  <p class="font-label-md text-label-md text-on-surface">Priya Sharma</p>
                  <p class="font-label-sm text-label-sm text-on-surface-variant">Lead Engineer &bull; 38 answers</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <img alt="Rahul Verma avatar" class="w-10 h-10 rounded-full"
                     src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsqniX4RKc2KJEFYNKgnhSUFmgoSah5girQmSMmaAHOZUsPnZ-0-4bj01xbLOMGGlNSKuRGt1Z1jwDJcewtCG1O2vgvM9R2YzhNJjhpf8wiZg6TwjbEFnTuUjNpZdpP2AXpS2oR_H4JTaln7Q9AOtKDjXYqYohwv855CFn1ETCrTgHrLgWK4TI72l-NsZscFmm-YO1sNnYr3y4FQR0C-SV6MQqPuhPqY1D9QyD9IuzozM-6yrWZ1ap0bwA_zooPSCq2OeQWEWPqg" />
                <div>
                  <p class="font-label-md text-label-md text-on-surface">Rahul Verma</p>
                  <p class="font-label-sm text-label-sm text-on-surface-variant">Project Lead &bull; 29 answers</p>
                </div>
              </div>
            </div>
          </div>

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
  qnaList: any[] = [];
  newQuestion = '';
  searchTerm = '';
  answerInputs: { [id: string]: string } = {};
  showAskForm = false;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadQna();
  }

  get filteredList() {
    if (!this.searchTerm) return this.qnaList;
    const term = this.searchTerm.toLowerCase();
    return this.qnaList.filter(q =>
      q.question.toLowerCase().includes(term) ||
      (q.answer && q.answer.toLowerCase().includes(term))
    );
  }

  loadQna() {
    this.api.getQna().subscribe(data => {
      this.qnaList = data;
      this.cdr.markForCheck();
    });
  }

  addQuestion() {
    this.api.createQna(this.newQuestion).subscribe(() => {
      this.newQuestion = '';
      this.showAskForm = false;
      this.loadQna();
    });
  }

  submitAnswer(id: string) {
    this.api.answerQna(id, this.answerInputs[id]).subscribe(() => {
      delete this.answerInputs[id];
      this.loadQna();
    });
  }

  remove(id: string) {
    this.api.deleteQna(id).subscribe(() => this.loadQna());
  }
}