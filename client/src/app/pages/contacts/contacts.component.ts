import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.css']
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [
    {
      id: 1,
      name: 'Basha Shaik',
      email: 'basha.shaik@aveva.com',
      role: 'Team Member',
      department: 'Engineering'
    },
    {
      id: 2,
      name: 'Prashanth Nidamarthy',
      email: 'prashanth.nidamarthy@aveva.com',
      role: 'Team Member',
      department: 'Engineering'
    },
    {
      id: 3,
      name: 'Liya A R',
      email: 'liya.ar@aveva.com',
      role: 'Team Member',
      department: 'Engineering'
    }
  ];
  newName = '';
  newEmail = '';
  showAddForm = false;

  constructor() {}

  ngOnInit() {}

  addContact() {
    if (this.newName.trim() && this.newEmail.trim()) {
      this.contacts.push({
        id: this.contacts.length + 1,
        name: this.newName,
        email: this.newEmail,
        role: 'New Contact',
        department: 'General'
      });
      this.newName = '';
      this.newEmail = '';
      this.showAddForm = false;
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }
}
