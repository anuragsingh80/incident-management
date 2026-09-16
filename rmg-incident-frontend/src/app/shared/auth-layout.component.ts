import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="auth-shell">
      <div class="brand">
        <div class="logo">R</div>
        <div><strong>RMG Incident</strong><span>Management System</span></div>
      </div>
      <div class="auth-card">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .auth-shell { min-height:100vh; display:grid; place-items:center; padding:24px; background:linear-gradient(135deg,#eef3ff,#f8fafc); }
    .auth-card { width:min(460px,100%); background:white; padding:30px; border-radius:20px; box-shadow:0 12px 40px rgba(0,0,0,.08); }
    .brand { position:fixed; top:24px; left:28px; display:flex; gap:10px; align-items:center; }
    .brand span { display:block; font-size:12px; color:#667085; margin-top:2px; }
    .logo { width:40px; height:40px; display:grid; place-items:center; border-radius:12px; background:#315efb; color:white; font-weight:700; font-size:20px; }
    @media(max-width:700px){ .brand { position:static; margin-bottom:18px; } .auth-shell { display:block; } }
  `]
})
export class AuthLayoutComponent {
  @Input() title = '';
}