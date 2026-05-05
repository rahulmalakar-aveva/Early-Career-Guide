import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Links</h2>

    <div *ngFor="let l of links$ | async">
      {{ l.title }}
    </div>
  `
})
export class LinksComponent {
  links$: Observable<any[]>;

  constructor(private api: ApiService) {
    this.links$ = this.api.getLinks();
  }
}