// src/app/incidents/assign-incident/assign-incident.component.ts

import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  MatCardModule
} from '@angular/material/card';

import {
  MatFormFieldModule
} from '@angular/material/form-field';

import {
  MatInputModule
} from '@angular/material/input';

import {
  MatSelectModule
} from '@angular/material/select';

import {
  MatButtonModule
} from '@angular/material/button';

import {
  MatIconModule
} from '@angular/material/icon';

import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';
import { Incident, User, UserResponse } from '../../../../core/models/models';
import { IncidentService } from '../../../../core/services/incident.service';



@Component({
  selector: 'app-assign-incident',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './assign-incident.component.html',
  styleUrls: ['./assign-incident.component.css']
})
export class AssignIncidentComponent implements OnInit {

  form!: FormGroup;

  incidents: Incident[] = [];
  users: UserResponse[] = [];

  selectedIncident?: Incident;

  loading = false;
  loadingUsers = false;

  constructor(
    private fb: FormBuilder,
    private incidentService: IncidentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      incidentId: ['', Validators.required],
      userId: ['', Validators.required]
    });

    this.loadIncidents();
    this.loadUsers();

    this.form.get('incidentId')?.valueChanges.subscribe(
      incidentId => {

        if (!incidentId) {
          this.selectedIncident = undefined;
          return;
        }

        this.selectedIncident =
          this.incidents.find(
            x => x.id === Number(incidentId)
          );
      }
    );
  }

  loadIncidents(): void {

    this.loading = true;

    this.incidentService.getAllIncidents().subscribe({
      next: incidents => {

        // Closed incidents should not be assignable
        this.incidents = incidents.filter(
          incident =>
            incident.status?.toUpperCase() !== 'CLOSED'
        );

        this.loading = false;
      },

      error: () => {

        this.loading = false;

        this.snackBar.open(
          'Unable to load incidents',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }

  loadUsers(): void {

    this.loadingUsers = true;

    this.incidentService.getUsers().subscribe({
      next: users => {

        this.users = users;
        this.loadingUsers = false;
      },

      error: () => {

        this.loadingUsers = false;

        this.snackBar.open(
          'Unable to load users',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }

  onIncidentChange(): void {

    const incidentId =
      this.form.get('incidentId')?.value;

    this.selectedIncident =
      this.incidents.find(
        x => x.id === Number(incidentId)
      );
  }

  assignIncident(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.selectedIncident) {
      return;
    }

    // Additional frontend protection
    if (
      this.selectedIncident.status?.toUpperCase() ===
      'CLOSED'
    ) {
      this.snackBar.open(
        'Closed incident cannot be assigned.',
        'Close',
        { duration: 3000 }
      );

      return;
    }

    const incidentId =
      Number(this.form.get('incidentId')?.value);

    const userId =
      Number(this.form.get('userId')?.value);

    this.loading = true;

    this.incidentService.assignIncident(
      incidentId,
      { userId }
    ).subscribe({

      next: () => {

        this.loading = false;

        this.snackBar.open(
          'Incident assigned successfully.',
          'Close',
          { duration: 3000 }
        );

        this.form.reset();

        this.selectedIncident = undefined;

        this.loadIncidents();
      },

      error: error => {

        this.loading = false;

        const message =
          error?.error?.message ||
          'Unable to assign incident.';

        this.snackBar.open(
          message,
          'Close',
          { duration: 4000 }
        );
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/incidents']);
  }

  getUserName(user: User): string {

    if (user.firstName || user.lastName) {
      return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
    }

    return user.username;
  }
}