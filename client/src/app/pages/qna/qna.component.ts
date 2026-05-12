import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-qna',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Q&A</h2>

    <div style="margin-bottom: 1rem;">
      <input [(ngModel)]="newQuestion" placeholder="Ask a question..." style="width: 400px; margin-right: 8px;" />
      <button (click)="addQuestion()" [disabled]="!newQuestion">Add Question</button>
    </div>

    <div *ngFor="let q of qnaList" style="margin-bottom: 1rem; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
      <div>
        <strong>Q:</strong> {{ q.question }}
        <button (click)="remove(q.id)" style="margin-left: 8px; color: red;">Delete</button>
      </div>

      <div *ngIf="q.answer" style="margin-top: 4px;">
        <strong>A:</strong> {{ q.answer }}
      </div>

      <div *ngIf="!q.answer" style="margin-top: 4px;">
        <input
          [(ngModel)]="answerInputs[q.id]"
          placeholder="Type your answer..."
          style="width: 350px; margin-right: 8px;"
        />
        <button (click)="submitAnswer(q.id)" [disabled]="!answerInputs[q.id]">Answer</button>
      </div>
    </div>
  `
})
export class QnaComponent implements OnInit {
  qnaList: any[] = [];
  newQuestion = '';
  answerInputs: { [id: string]: string } = {};

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadQna();
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