import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, switchMap, catchError, of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AppShellComponent } from '../../../../shared/app-shell.component';
import { LocationService } from '../../../../core/services/location.service';
import { IncidentService } from '../../../../core/services/incident.service';


@Component({
    standalone: true,
    imports:
        [ReactiveFormsModule,
            RouterLink, MatFormFieldModule,
            MatInputModule, MatSelectModule,
            MatButtonModule,
            
            AppShellComponent],
    templateUrl: './incident-form.component.html',
    styleUrls: ['./incident-form.component.scss']
})
export class IncidentFormComponent {
    loading=false;
    error=''
    private fb = inject(FormBuilder);
    private location = inject(LocationService);
    private incidents = inject(IncidentService);
    private router = inject(Router);
    form = this.fb.nonNullable.group({
         title: ['', Validators.required],
          description: ['', Validators.required],
          category: ['', Validators.required],
          priority: ['MEDIUM', Validators.required], 
          
         
             });
          
    constructor() {

        
    }
    submit() {
        

        const { title, description, category, priority } = this.form.getRawValue();
        this.incidents.create(

            {
                title,
                description,
                category,
                priority,
               
               
            }
        )
            .subscribe({
                next: i => this.router.navigate(['/incidents', i.id]),
                error: e => {
                    this.error = e?.error?.message ||
                        'Could not create incident.'; this.loading = false;
                }

            });
    }
}