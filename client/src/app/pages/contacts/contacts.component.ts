import { Component, OnInit, signal } from '@angular/core';
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
  contacts = signal<any[]>([]);
  newName = '';
  newEmail = '';
  showAddForm = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.api.getContacts().subscribe({
      next: (data) => {
        console.log('Contacts loaded:', data);
        this.contacts.set(data);
      },
      error: (err) => {
        console.error('Error loading contacts:', err);
      }
    });
  }

  addContact() {
    if (this.newName.trim() && this.newEmail.trim()) {
      this.api.createContact(this.newName, this.newEmail).subscribe({
        next: () => {
          this.loadContacts();
          this.newName = '';
          this.newEmail = '';
          this.showAddForm = false;
        },
        error: (err) => {
          console.error('Error adding contact:', err);
        }
      });
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
}
