import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../core/auth/auth.service';

@Component({
    selector: 'app-app-shell', standalone: true, imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
    template: `<mat-toolbar>
 <span class="brand">RMG Incident</span><span class="spacer"> </span>
 <span class="spacer">Welcome :<b>{{email}}</b> </span>
 <a mat-button routerLink="/user" routerLinkActive="active">User Details</a>
 <a mat-button routerLink="/incidents" routerLinkActive="active">Incidents</a>
 
 <a mat-flat-button color="primary" routerLink="/incidents/new">+ New Incident</a>
 <button mat-button (click)="logout()">Logout</button>
 </mat-toolbar>
 <ng-content />`,
    styles: [`mat-toolbar{padding:0 24px;gap:8px}.brand{font-weight:700}.spacer{flex:1}.active{font-weight:700}@media(max-width:600px){mat-toolbar{padding:0 8px}.brand{font-size:14px}mat-toolbar a{display:none}}`]
})
export class AppShellComponent {

        email=localStorage.getItem('email');
       private auth = inject(AuthService);
       private router = inject(Router);
       logout() {
         this.auth.logout();
          this.router.navigate(['/login']);
         }
         }