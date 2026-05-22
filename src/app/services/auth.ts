import { effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  router = inject(Router)
  currentUser = signal<User | null>(JSON.parse(localStorage.getItem('currentUser') ?? 'null'))

  private readonly _ = effect(() => {
    const user = this.currentUser();
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }else {
      localStorage.removeItem('currentUser')
    }
  })

  register(pseudo: string, email: string, password: string) {
    const user: User = { pseudo, email, password };
    localStorage.setItem(pseudo, JSON.stringify(user));
    this.currentUser.set(user);
  }

  login(pseudo: string, password: string) {
    const data = localStorage.getItem(pseudo);
    if (!data) return false;

    const user: User = JSON.parse(data);
    if (user.password !== password) return false;
    this.currentUser.set(user);
    return true;
  }

  logout() {
    this.currentUser.set(null)
    this.router.navigate(['/auth'])
  }

}
