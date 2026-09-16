import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from '../../shared/auth-layout.component';
import { AuthService } from '../../core/auth/auth.service';

@Component({
 standalone:true,imports:[ReactiveFormsModule,RouterLink,MatFormFieldModule,MatInputModule,MatButtonModule,AuthLayoutComponent],
 template:`<app-auth-layout><h1>Forgot password</h1><p class="sub">Enter your email and we'll send a reset link.</p>
 <form [formGroup]="form" (ngSubmit)="submit()"><mat-form-field appearance="outline" class="full"><mat-label>Email</mat-label><input matInput type="email" formControlName="email"></mat-form-field>
 @if(error){<div class="error">{{error}}</div>} @if(success){<div class="success">{{success}}</div>}
 <button mat-flat-button color="primary" class="full" [disabled]="form.invalid||loading">{{loading?'Sending...':'Send reset link'}}</button></form>
 <a routerLink="/login">Back to login</a></app-auth-layout>`,
 styles:[`.full{width:100%;margin-bottom:12px}.sub{color:#667085}.error{color:#b3261e}.success{color:#146c2e}a{color:#315efb;text-decoration:none}`]
})
export class ForgotPasswordComponent{
 private fb=inject(FormBuilder);private auth=inject(AuthService);
 form=this.fb.nonNullable.group({email:['',[Validators.required,Validators.email]]});loading=false;error='';success='';
 submit(){if(this.form.invalid)return;this.loading=true;this.auth.forgotPassword(this.form.controls.email.value).subscribe({
  next:()=>{this.success='If the account exists, a password-reset email has been sent.';this.loading=false;},
  error:()=>{this.success='If the account exists, a password-reset email has been sent.';this.loading=false;}
 });}
}