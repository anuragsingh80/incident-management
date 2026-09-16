import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/user-registration/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./features/auth/reset-password.component').then(m => m.ResetPasswordComponent)
  },

  {
    path: 'user',
    canActivate: [authGuard],
    loadComponent: () => import('./features/user-details/user-detail.component').then(m => m.UserDetailsComponent)
  },
  {
    path: 'incidents',
    canActivate: [authGuard],
    loadComponent: () => import('./features/incidents/pages/incident-list/incident-list.component').then(m => m.IncidentListComponent)
  },
  {
    path: 'incidents/new',
    canActivate: [authGuard],
    loadComponent: () => import('./features/incidents/pages/incident-form/incident-form.component').then(m => m.IncidentFormComponent)
  },
  {
    path: 'incidents/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/incidents/pages/incident-details/incident-detailsincident-details').then(m => m.IncidentDetailsComponent)
  },

   {
    path: 'edit/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/incidents/pages/incident-edit/incident-edit.component').then(m => m.IncidentEditComponent)
  },

   {
    path: 'assign',
     canActivate: [authGuard],
    loadComponent: () =>
      import('./features/incidents/pages/assign-incident/assign-incident.component')
        .then(m => m.AssignIncidentComponent)
  },
  { path: '**', redirectTo: 'login' }
];