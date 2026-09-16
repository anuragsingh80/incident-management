import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from '../../shared/auth-layout.component';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, AuthLayoutComponent],
  template: `
    <app-auth-layout>
      <h1>Sign in</h1><p class="sub">Access your incident management dashboard.</p>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline" class="full"><mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full"><mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>
        @if(error){<div class="error">{{error}}</div>}
        <button mat-flat-button color="primary" class="full" [disabled]="form.invalid || loading">
          {{loading ? 'Signing in...' : 'Sign in'}}
        </button>
      </form>
      <div class="links"><a routerLink="/forgot-password">Forgot password?</a><a routerLink="/register">Create account</a></div>
    </app-auth-layout>
  `,
  styles: [`.full{width:100%;margin-bottom:10px}.sub{color:#667085;margin-bottom:22px}.links{display:flex;justify-content:space-between;margin-top:18px}a{color:#315efb;text-decoration:none}.error{color:#b3261e;margin:5px 0 12px}`]
})
export class LoginComponent {
  private fb=inject(FormBuilder); private auth=inject(AuthService); private router=inject(Router);
  form=this.fb.nonNullable.group({email:['',[Validators.required,Validators.email]],password:['',Validators.required]});
  loading=false; error='';
  submit(){
    if(this.form.invalid)return;
    this.loading=true; this.error='';
    this.auth.login(this.form.getRawValue()).subscribe({
      next:()=>this.router.navigate(['/incidents']),
      error:()=>{this.error='Invalid email or password.';this.loading=false;}
    });
  }
}