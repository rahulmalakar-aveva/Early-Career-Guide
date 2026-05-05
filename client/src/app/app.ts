import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Early Careers Portal</h1>

    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/links">Links</a> |
      <a routerLink="/qna">QnA</a> |
      <a routerLink="/tips">Tips</a> |
      <a routerLink="/questions">Questions</a>
    </nav>

    <hr />

    <router-outlet></router-outlet>
  `
})
export class App {}