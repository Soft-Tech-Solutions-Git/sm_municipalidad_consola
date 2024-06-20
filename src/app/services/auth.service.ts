import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private router: Router) { }

    isLoggedIn(): boolean {
        return true;
    }

    // isLoggedIn(): boolean {
    //   return !!localStorage.getItem('usuario');
    // }

    login(user_id: number): void {
        localStorage.setItem('usuario', JSON.stringify(user_id));
    }

    logout(): void {
        localStorage.removeItem('usuario');
        this.router.navigate(['/login']);
    }
}
