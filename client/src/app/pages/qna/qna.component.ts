import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-qna',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let q of qna$ | async">
      <h3>{{ q.question }}</h3>
      <p>{{ q.answer }}</p>
    </div>
  `
})
export class QnaComponent {

  qna$: Observable<any[]>;
  constructor(private api: ApiService) {
    this.qna$ = this.api.getQna();
  }

}