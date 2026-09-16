import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from '../../shared/auth-layout.component';
import { AuthService } from '../../core/auth/auth.service';

@Component({
 standalone:true,imports:[ReactiveFormsModule,RouterLink,MatFormFieldModule,MatInputModule,MatButtonModule,AuthLayoutComponent],
 template:`<app-auth-layout><h1>Reset password</h1><p class="sub">Choose a new password.</p>
 <form [formGroup]="form" (ngSubmit)="submit()"><mat-form-field appearance="outline" class="full"><mat-label>New password</mat-label><input matInput type="password" formControlName="password"></mat-form-field>
 <mat-form-field appearance="outline" class="full"><mat-label>Confirm password</mat-label><input matInput type="password" formControlName="confirm"></mat-form-field>
 @if(form.errors?.['mismatch']){<div class="error">Passwords do not match.</div>} @if(error){<div class="error">{{error}}</div>} @if(success){<div class="success">{{success}}</div>}
 <button mat-flat-button color="primary" class="full" [disabled]="form.invalid||loading">{{loading?'Updating...':'Reset password'}}</button></form>
 <a routerLink="/login">Back to login</a></app-auth-layout>`,
 styles:[`.full{width:100%;margin-bottom:12px}.sub{color:#667085}.error{color:#b3261e}.success{color:#146c2e}a{color:#315efb;text-decoration:none}`]
})
export class ResetPasswordComponent{
 private fb=inject(FormBuilder);private auth=inject(AuthService);private route=inject(ActivatedRoute);private router=inject(Router);
 token=this.route.snapshot.queryParamMap.get('token')||'';
 form=this.fb.nonNullable.group({password:['',[Validators.required,Validators.minLength(8)]],confirm:['',Validators.required]},{validators:c=>c.get('password')?.value===c.get('confirm')?.value?null:{mismatch:true}});
 loading=false;error='';success='';
 submit(){if(this.form.invalid||!this.token)return;this.loading=true;this.auth.resetPassword(this.token,this.form.controls.password.value).subscribe({
  next:()=>{this.success='Password reset successfully.';setTimeout(()=>this.router.navigate(['/login']),1000);},
  error:(e)=>{this.error=e?.error?.message||'Invalid or expired reset token.';this.loading=false;}
 });}
}