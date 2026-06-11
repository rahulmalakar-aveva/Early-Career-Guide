import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-unit-xl flex flex-col gap-unit-xl">

      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="font-display-lg text-display-lg text-primary mb-1">Admin Dashboard</h1>
          <p class="font-body-md text-body-md text-on-surface-variant">Manage all portal content from one place.</p>
        </div>
        <div class="flex items-center gap-2 bg-tertiary-container/30 px-4 py-2 rounded-full">
          <span class="material-symbols-outlined text-tertiary text-[18px]">shield_person</span>
          <span class="font-label-sm text-label-sm text-on-surface">Admin Mode Active</span>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 bg-surface-container rounded-xl p-1 overflow-x-auto">
        @for (tab of tabs; track tab.key) {
          <button (click)="switchTab(tab.key)"
                  [class]="activeTab() === tab.key
                    ? 'flex-1 min-w-[100px] px-4 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md transition-all shadow-sm flex items-center justify-center gap-2'
                    : 'flex-1 min-w-[100px] px-4 py-3 rounded-lg text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-all flex items-center justify-center gap-2'">
            <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>
            <span class="hidden sm:inline">{{ tab.label }}</span>
          </button>
        }
      </div>

      <!-- Content Area -->
      <div class="bg-surface-container-lowest rounded-xl ambient-shadow border border-outline-variant/30 overflow-hidden">

        <!-- Toolbar -->
        <div class="flex items-center justify-between p-unit-md border-b border-outline-variant/20 bg-surface-container/30">
          <h2 class="font-headline-sm text-headline-sm text-on-surface">{{ activeTabLabel() }}</h2>
          <button (click)="startAdd()"
                  class="bg-primary hover:bg-primary/90 text-on-primary font-label-sm text-label-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
            <span class="material-symbols-outlined text-[18px]">add</span>
            Add New
          </button>
        </div>

        <!-- Add/Edit Form -->
        @if (showForm()) {
          <div class="p-unit-md border-b border-outline-variant/20 bg-surface-container-low/50">
            <h3 class="font-label-lg text-label-lg text-on-surface mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[20px]">{{ editingId ? 'edit' : 'add_circle' }}</span>
              {{ editingId ? 'Edit Item' : 'Add New Item' }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              @for (field of activeFields(); track field.key) {
                <div class="flex flex-col gap-1">
                  <label class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{{ field.label }}</label>
                  @if (field.type === 'textarea') {
                    <textarea [(ngModel)]="formData[field.key]"
                              rows="3"
                              class="px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg font-body-sm text-body-sm text-on-surface outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                              [placeholder]="field.placeholder || ''"></textarea>
                  } @else {
                    <input [(ngModel)]="formData[field.key]"
                           [type]="field.type || 'text'"
                           class="px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg font-body-sm text-body-sm text-on-surface outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                           [placeholder]="field.placeholder || ''" />
                  }
                </div>
              }
            </div>
            <div class="flex gap-3">
              <button (click)="saveItem()"
                      class="bg-primary text-on-primary font-label-sm text-label-sm px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px]">check</span>
                {{ editingId ? 'Update' : 'Create' }}
              </button>
              <button (click)="cancelForm()"
                      class="border border-outline-variant text-on-surface-variant font-label-sm text-label-sm px-5 py-2 rounded-lg hover:bg-surface-container transition-colors">
                Cancel
              </button>
            </div>
          </div>
        }

        <!-- Data Table -->
        <div class="overflow-x-auto">
          @if (loading()) {
            <div class="flex items-center justify-center py-16 text-on-surface-variant">
              <span class="material-symbols-outlined text-[32px] animate-spin">progress_activity</span>
            </div>
          } @else if (items().length === 0) {
            <div class="flex flex-col items-center justify-center py-16 text-on-surface-variant gap-3">
              <span class="material-symbols-outlined text-[48px] text-outline-variant">inbox</span>
              <p class="font-body-lg text-body-lg">No items yet. Click "Add New" to get started.</p>
            </div>
          } @else {
            <table class="w-full">
              <thead>
                <tr class="border-b border-outline-variant/20">
                  @for (field of activeFields(); track field.key) {
                    <th class="text-left px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{{ field.label }}</th>
                  }
                  <th class="text-right px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (item of items(); track item.id || $index) {
                  <tr class="border-b border-outline-variant/10 hover:bg-surface-container/30 transition-colors">
                    @for (field of activeFields(); track field.key) {
                      <td class="px-4 py-3 font-body-sm text-body-sm text-on-surface max-w-[300px] truncate">{{ item[field.key] }}</td>
                    }
                    <td class="px-4 py-3 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <button (click)="startEdit(item)"
                                class="p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                                title="Edit">
                          <span class="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button (click)="confirmDelete(item)"
                                class="p-2 rounded-lg text-error hover:bg-error/10 transition-colors"
                                title="Delete">
                          <span class="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          }
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      @if (deleteTarget) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center">
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" (click)="deleteTarget = null"></div>
          <div class="relative bg-surface-container-lowest rounded-2xl p-8 shadow-2xl border border-outline-variant/30 w-full max-w-sm mx-4 flex flex-col items-center gap-6">
            <div class="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-error text-[32px]">warning</span>
            </div>
            <div class="text-center">
              <h3 class="font-headline-sm text-headline-sm text-on-surface mb-1">Delete Item?</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">This action cannot be undone.</p>
            </div>
            <div class="w-full flex gap-3">
              <button (click)="deleteTarget = null"
                      class="flex-1 border border-outline-variant text-on-surface-variant font-label-md text-label-md px-4 py-3 rounded-lg hover:bg-surface-container transition-colors">
                Cancel
              </button>
              <button (click)="executeDelete()"
                      class="flex-1 bg-error text-on-error font-label-md text-label-md px-4 py-3 rounded-lg hover:bg-error/90 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      }

    </main>
  `
})
export class AdminComponent implements OnInit {
  tabs = [
    { key: 'tips', label: 'Survival Guide', icon: 'lightbulb' },
    { key: 'links', label: 'Useful Links', icon: 'link' },
    { key: 'qna', label: 'Q&A', icon: 'forum' },
    { key: 'sessions', label: 'Peer Sessions', icon: 'groups' },
    { key: 'faqs', label: 'FAQs', icon: 'help' },
    { key: 'contacts', label: 'Contacts', icon: 'contact_page' },
  ];

  activeTab = signal<string>('tips');
  items = signal<any[]>([]);
  loading = signal<boolean>(false);
  showForm = signal<boolean>(false);
  formData: any = {};
  editingId: any = null;
  deleteTarget: any = null;

  activeTabLabel = computed(() => this.tabs.find(t => t.key === this.activeTab())?.label || '');

  // Field definitions per tab
  fieldMap: Record<string, { key: string; label: string; type?: string; placeholder?: string }[]> = {
    tips: [
      { key: 'title', label: 'Title', placeholder: 'Tip title' },
      { key: 'content', label: 'Content', type: 'textarea', placeholder: 'Tip content...' },
      { key: 'authorName', label: 'Author', placeholder: 'Author name' },
    ],
    links: [
      { key: 'title', label: 'Title', placeholder: 'Link title' },
      { key: 'url', label: 'URL', placeholder: 'https://...' },
      { key: 'category', label: 'Category', placeholder: 'e.g. Learning' },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Description...' },
    ],
    qna: [
      { key: 'question', label: 'Question', type: 'textarea', placeholder: 'Question...' },
      { key: 'answer', label: 'Answer', type: 'textarea', placeholder: 'Answer (leave empty if unanswered)' },
    ],
    sessions: [
      { key: 'title', label: 'Title', placeholder: 'Session title' },
      { key: 'joinLink', label: 'Teams Link', placeholder: 'https://teams.microsoft.com/...' },
    ],
    faqs: [
      { key: 'question', label: 'Question', type: 'textarea', placeholder: 'FAQ question' },
      { key: 'answer', label: 'Answer', type: 'textarea', placeholder: 'FAQ answer' },
      { key: 'category', label: 'Category', placeholder: 'e.g. Onboarding' },
      { key: 'displayOrder', label: 'Order', type: 'number', placeholder: '1' },
    ],
    contacts: [
      { key: 'name', label: 'Name', placeholder: 'Full name' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'email@aveva.com' },
    ],
  };

  activeFields = computed(() => this.fieldMap[this.activeTab()] || []);

  constructor(
    private adminService: AdminService,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.adminService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
    this.loadData();
  }

  switchTab(key: string) {
    this.activeTab.set(key);
    this.cancelForm();
    this.loadData();
  }

  loadData() {
    this.loading.set(true);
    const tab = this.activeTab();
    let obs;
    switch (tab) {
      case 'tips': obs = this.api.getPosts('tip'); break;
      case 'links': obs = this.api.getLinks(); break;
      case 'qna': obs = this.api.getQna(); break;
      case 'sessions': obs = this.api.getPeerSessions(); break;
      case 'faqs': obs = this.api.getFaqs(); break;
      case 'contacts': obs = this.api.getContacts(); break;
      default: return;
    }
    obs.subscribe({
      next: (data: any[]) => { this.items.set(data); this.loading.set(false); },
      error: () => { this.items.set([]); this.loading.set(false); }
    });
  }

  startAdd() {
    this.editingId = null;
    this.formData = {};
    this.showForm.set(true);
  }

  startEdit(item: any) {
    this.editingId = item.id;
    this.formData = { ...item };
    this.showForm.set(true);
  }

  cancelForm() {
    this.showForm.set(false);
    this.formData = {};
    this.editingId = null;
  }

  saveItem() {
    const tab = this.activeTab();
    let obs;

    if (this.editingId) {
      // Update
      switch (tab) {
        case 'tips': obs = this.api.updatePost(this.editingId, { title: this.formData.title, content: this.formData.content, authorName: this.formData.authorName, type: 'tip' }); break;
        case 'links': obs = this.api.updateLink(this.editingId, this.formData); break;
        case 'qna': obs = this.api.answerQna(this.editingId, this.formData.answer); break;
        case 'sessions': obs = this.api.updatePeerSession(this.editingId, this.formData); break;
        case 'faqs': obs = this.api.updateFaq(this.editingId, this.formData); break;
        case 'contacts': obs = this.api.updateContact(this.editingId, this.formData); break;
        default: return;
      }
    } else {
      // Create
      switch (tab) {
        case 'tips': obs = this.api.createPost({ title: this.formData.title, content: this.formData.content, authorName: this.formData.authorName || 'Admin', type: 'tip' }); break;
        case 'links': obs = this.api.createLink(this.formData); break;
        case 'qna': obs = this.api.createQna(this.formData.question); break;
        case 'sessions': obs = this.api.createPeerSession(this.formData); break;
        case 'faqs': obs = this.api.createFaq(this.formData); break;
        case 'contacts': obs = this.api.createContact(this.formData.name, this.formData.email); break;
        default: return;
      }
    }

    obs.subscribe({
      next: () => { this.cancelForm(); this.loadData(); },
      error: (err: any) => console.error('Save error:', err)
    });
  }

  confirmDelete(item: any) {
    this.deleteTarget = item;
  }

  executeDelete() {
    if (!this.deleteTarget) return;
    const tab = this.activeTab();
    const id = this.deleteTarget.id;
    let obs;
    switch (tab) {
      case 'tips': obs = this.api.deletePost(id); break;
      case 'links': obs = this.api.deleteLink(id); break;
      case 'qna': obs = this.api.deleteQna(id); break;
      case 'sessions': obs = this.api.deletePeerSession(id); break;
      case 'faqs': obs = this.api.deleteFaq(id); break;
      case 'contacts': obs = this.api.deleteContact(id); break;
      default: return;
    }
    obs.subscribe({
      next: () => { this.deleteTarget = null; this.loadData(); },
      error: (err: any) => { console.error('Delete error:', err); this.deleteTarget = null; }
    });
  }
}
