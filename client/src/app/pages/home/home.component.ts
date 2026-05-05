import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Portal</h1>
    <a routerLink="/links">Links</a>
    <a routerLink="/qna">QnA</a>
    <a routerLink="/tips">Tips</a>
    <a routerLink="/questions">Questions</a>
  `
})
export class HomeComponent {}