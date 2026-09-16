import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppShellComponent } from '../../shared/app-shell.component';


import { AuthService } from '../../core/auth/auth.service';
import { UserResponse } from '../../core/models/models';
import { IncidentService } from '../../core/services/incident.service';



@Component({
    standalone: true,
    imports: [DatePipe, RouterLink,
        MatButtonModule, MatSelectModule,
        MatFormFieldModule,
        AppShellComponent],
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']

})
export class UserDetailsComponent implements OnInit {

    private service = inject(AuthService);
    private service1 = inject(IncidentService);

    loading = false;

    saving = false;

    locationLoading = false;

    id:any;

    errorMessage = '';
    incident: UserResponse | null = null;

    ngOnInit(): void {
        //this.loadInciidents();
        this.loadUserSetail();



    }

     private loadIncidents(): void {
         this.service1.getIncidentById(1).subscribe({
       });
        
     }

    private loadUserSetail(): void {
       this.id= localStorage.getItem('userId')
      
       
        this.service1.getUserDetail(this.id).subscribe({
               
            next: (response) => {
                  
                this.incident = response;


                this.loading = false;
            },

            error: (error) => {

                console.error(
                    'Unable to load user details',
                    error
                );

                this.errorMessage =
                    error?.error?.message ||
                    'Unable to load user details.';

                this.loading = false;
            }
        });
    }

}