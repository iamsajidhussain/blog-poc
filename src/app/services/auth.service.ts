import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'users';
  private readonly currentUserKey = 'currentUser';
  private readonly authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  
  register(user: { username: string; password: string }): boolean {
    const users = this.getUsers();
    if (users.find((u) => u.username === user.username)) {
      return false; // Username already exists
    }
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      this.authSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.authSubject.next(false);
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.currentUserKey) !== null;
  }

  getAuthState() {
    return this.authSubject.asObservable();
  }
}
