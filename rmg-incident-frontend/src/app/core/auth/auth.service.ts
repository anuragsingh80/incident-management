import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthResponse, RegisterRequest, UserResponse } from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080/api/auth';
  private base1 = 'http://localhost:8080/api/user';
  
  private readonly USER_KEY = 'user';
currentUser = signal<AuthResponse | null>(this.getUserFromStorage());
  login(payload: {email: string; password: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, payload).pipe(
      tap(r => 
       this.handleAuthResponse(r)
        //localStorage.setItem('rmg_token', r.accessToken,)
                
    )
    );
  }

    private handleAuthResponse(response: AuthResponse): void {
     localStorage.setItem('rmg_token', response.accessToken,)
     localStorage.setItem('email', response.email)
     localStorage.setItem('userId', response.userId.toString())
     localStorage.setItem('role', response.role)
    
   
  }

  private getUserFromStorage(): AuthResponse | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  register(request: RegisterRequest) {
    return this.http.post<void>(`${this.base}/register`, request);
  }

   

  forgotPassword(email: string) {
    return this.http.post<void>(`${this.base}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post<void>(`${this.base}/reset-password`, { token, newPassword });
  }

  logout() {
    localStorage.removeItem('rmg_token');
     localStorage.removeItem('email');
     localStorage.removeItem('userId');
     localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('rmg_token');
  }

  token(): string | null {
    return localStorage.getItem('rmg_token');
  }
}