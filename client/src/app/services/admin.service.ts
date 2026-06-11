import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly ADMIN_PASSWORD = 'admin123';
  private readonly STORAGE_KEY = 'ecp_admin';
  
  private _isAdmin = signal<boolean>(this.checkStored());
  
  readonly isAdmin = this._isAdmin.asReadonly();

  login(password: string): boolean {
    if (password === this.ADMIN_PASSWORD) {
      sessionStorage.setItem(this.STORAGE_KEY, 'true');
      this._isAdmin.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
    this._isAdmin.set(false);
  }

  private checkStored(): boolean {
    return sessionStorage.getItem(this.STORAGE_KEY) === 'true';
  }
}
