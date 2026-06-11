import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faqs.html',
  styleUrls: ['./faqs.css']
})
export class FaqsComponent implements OnInit {
  faqs = signal<any[]>([]);
  selectedCategory = signal<string>('All');
  expandedFaqId = signal<number | null>(null);

  categories = computed(() => {
    const allFaqs = this.faqs();
    const cats = new Set(allFaqs.map(f => f.category));
    return ['All', ...Array.from(cats)];
  });

  filteredFaqs = computed(() => {
    const category = this.selectedCategory();
    const allFaqs = this.faqs();
    if (category === 'All') return allFaqs;
    return allFaqs.filter(f => f.category === category);
  });

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadFaqs();
  }

  loadFaqs() {
    this.api.getFaqs().subscribe({
      next: (data) => {
        this.faqs.set(data);
      },
      error: (err) => {
        console.error('Error loading FAQs:', err);
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  toggleFaq(id: number) {
    if (this.expandedFaqId() === id) {
      this.expandedFaqId.set(null);
    } else {
      this.expandedFaqId.set(id);
    }
  }

  isExpanded(id: number): boolean {
    return this.expandedFaqId() === id;
  }
}
