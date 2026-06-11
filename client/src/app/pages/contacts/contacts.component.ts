import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css']
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];
  newName = '';
  newEmail = '';
  showAddForm = false;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.api.getContacts().subscribe({
      next: (data) => { this.contacts = data; this.cdr.markForCheck(); },
      error: () => {}
    });
  }

  addContact() {
    if (this.newName.trim() && this.newEmail.trim()) {
      this.api.createContact(this.newName, this.newEmail).subscribe({
        next: () => {
          this.newName = '';
          this.newEmail = '';
          this.showAddForm = false;
          this.loadContacts();
        },
        error: () => {}
      });
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
}
