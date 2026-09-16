import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppShellComponent } from '../../../../shared/app-shell.component';
import { IncidentService } from '../../../../core/services/incident.service';
import { Incident } from '../../../../core/models/models';
import { MatIconModule } from '@angular/material/icon';


@Component({
    standalone: true,
    imports: [DatePipe, RouterLink,
        MatButtonModule, MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        AppShellComponent],
    templateUrl: './incident-detailsincident-details.html',
    styleUrls: ['./incident-detailsincident-details.scss']

})
export class IncidentDetailsComponent implements OnInit {
    [x: string]: any;
    private route = inject(ActivatedRoute);
    private readonly router =
    inject(Router);
    private service = inject(IncidentService);
    incident?: Incident; error = '';
    
    statuses = ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REOPENED', 'CANCELLED'];
    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.service.get(id).subscribe({ next: i => this.incident = i, error: () => this.error = 'Incident not found.' });
    }
    changeStatus(status: string) {
        if (!this.incident)
            return;
        this.service.updateStatus(this.incident.id, status).subscribe
            ({
                next: i => this.incident = i,
                error: () => this.error = 'Could not update status.'
            });
    }


     /**
   * Cancel editing
   */
  cancel(): void {

   

      this.router.navigate([
        '/incidents',
        
      ]);

    
  }
}