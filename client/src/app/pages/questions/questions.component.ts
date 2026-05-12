import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let p of posts">
      <h3>{{p.title}}</h3>
      <p>{{p.content}}</p>
    </div>
  `
})
export class QuestionsComponent implements OnInit {
  posts: any[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getPosts('junior').subscribe((x: any) => {
      this.posts = x;
      this.cdr.markForCheck();
    });
  }
}