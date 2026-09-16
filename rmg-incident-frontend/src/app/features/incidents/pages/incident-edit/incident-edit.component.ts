import {
  Component,
  OnInit,
  inject
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
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

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
  MatCardModule
} from '@angular/material/card';

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
import { IncidentService } from '../../../../core/services/incident.service';
import { Incident, UpdateIncidentRequest } from '../../../../core/models/models';
import { AppShellComponent } from '../../../../shared/app-shell.component';



@Component({
  selector: 'app-incident-edit',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
   AppShellComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],

  templateUrl: './incident-edit.component.html',

  styleUrls: [
    './incident-edit.component.scss'
  ]
})
export class IncidentEditComponent implements OnInit {

  private readonly fb = inject(FormBuilder);

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly incidentService =
    inject(IncidentService);

  

  private readonly snackBar =
    inject(MatSnackBar);

  incidentForm!: FormGroup;

  incident: Incident | null = null;

  incidentDatabaseId!: number;

  loading = false;

  saving = false;

  locationLoading = false;

  errorMessage = '';

  categories = [
    'Software',
    'APPLICATION',
    'Network',
    'DATABASE',
    'Access',
    'Hardware',
    'Other'
  ];

  priorities = [
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
  ];

  statuses = [
    'OPEN',
    'IN_PROGRESS',
    'RESOLVED',
    'CLOSED',
    'REJECTED'
  ];

  ngOnInit(): void {

    this.createForm();

    this.incidentDatabaseId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    if (!this.incidentDatabaseId) {

      this.errorMessage =
        'Invalid incident ID.';

      return;
    }

    this.loadIncident(
      this.incidentDatabaseId
    );
  }

  /**
   * Create reactive form
   */
  private createForm(): void {

    this.incidentForm =
      this.fb.group({

        title: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(200)
          ]
        ],

        description: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(5000)
          ]
        ],

        category: [
          '',
          Validators.required
        ],

        priority: [
          '',
          Validators.required
        ],

        status: [
          '',
          Validators.required
        ],

       

        assignedTo: [
          ''
        ]
      });

    /**
     * Automatically lookup location
     * when PIN changes.
     */
    this.incidentForm
     
  }

  /**
   * Load incident from backend
   */
  private loadIncident(
    id: number
  ): void {

    this.loading = true;

    this.incidentService
      .getIncidentById(id)
      .subscribe({

        next: (response) => {

          this.incident = response;

          this.populateForm(response);

          this.loading = false;
        },

        error: (error) => {

          console.error(
            'Unable to load incident',
            error
          );

          this.errorMessage =
            error?.error?.message ||
            'Unable to load incident.';

          this.loading = false;
        }
      });
  }

  /**
   * Populate form with existing data
   */
  private populateForm(
    incident: Incident
  ): void {

    this.incidentForm.patchValue({

      title: incident.title,

      description:
        incident.description,

      category:
        incident.category,

      priority:
        incident.priority,

      status:
        incident.status,

     
      assignedTo:
        incident.assignedTo || ''
    });
  }

  

  /**
   * Update incident
   */
  updateIncident(): void {

    if (
      this.incidentForm.invalid
    ) {

      this.incidentForm.markAllAsTouched();

      return;
    }

    this.saving = true;

    this.errorMessage = '';

    const request:
      UpdateIncidentRequest =
      this.incidentForm.getRawValue();

    this.incidentService
      .updateIncident(
        this.incidentDatabaseId,
        request
      )
      .subscribe({

        next: (response) => {

          this.saving = false;

          this.incident = response;

          this.snackBar.open(
            `Incident ${response.incidentId} updated successfully.`,
            'Close',
            {
              duration: 4000
            }
          );

          this.router.navigate([
            '/incidents',
            response.id
          ]);
        },

        error: (error) => {

          console.error(
            'Incident update failed',
            error
          );

          this.saving = false;

          this.errorMessage =
            error?.error?.message ||
            'Unable to update incident.';

          this.snackBar.open(
            this.errorMessage,
            'Close',
            {
              duration: 5000
            }
          );
        }
      });
  }

  /**
   * Cancel editing
   */
  cancel(): void {

    if (this.incidentDatabaseId) {

      this.router.navigate([
        '/incidents',
        
      ]);

    } else {

      this.router.navigate([
        '/incidents'
      ]);
    }
  }

  /**
   * Convenient form getter
   */
  get f() {
    return this.incidentForm.controls;
  }
}