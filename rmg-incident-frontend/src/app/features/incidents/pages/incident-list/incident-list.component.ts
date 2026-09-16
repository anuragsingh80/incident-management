import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IncidentService } from '../../../../core/services/incident.service';
import { Incident, PageResponse } from '../../../../core/models/models';
import { AppShellComponent } from '../../../../shared/app-shell.component';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';


@Component({
    standalone: true,
    imports: [CommonModule,
      MatPaginatorModule,
      MatInputModule, 
        MatIcon,
        MatIconModule,
        MatProgressSpinnerModule,
         RouterLink, 
        MatTableModule,
         MatButtonModule,
          MatSelectModule,
          MatFormFieldModule,
           AppShellComponent],
    templateUrl: './incident-list.component copy.html',
    styleUrls: ['./incident-list.component.scss']
})
export class IncidentListComponent implements OnInit {
    private service = inject(IncidentService);
     data = signal<Incident[]>([]);
    dataSource = new MatTableDataSource<Incident>([]);
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
@ViewChild(MatSort, {}) sort: MatSort | undefined;
    //data: PageResponse<Incident> = {
        // content: [], totalElements: 0, 
        // totalPages: 0, number: 0, size: 20 }; 
         displayedColumns = ['incidentId', 'title', 'category', 'priority', 'status',  'createdAt','edit', 'view', 'delete']; 
         page = 0; status = ''; priority = '';
    statuses = ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REOPENED', 'CANCELLED'];
     priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

     ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
   
    ngOnInit() {
        // this.load();
          this.loadAllUsers();
         }

         loadAllUsers(): void {
   

     this.service.getAllIncidents()
      .subscribe({
        next: (res:any) => {
        
          this.dataSource.data = res;
         
        },
        error: (error) => {
          console.error('Failed to load users:', error);
         
          this.data.set([]);
        },
      });
  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onNavigate(title: any){
console.log(`product code ${title}`)
}

    load() {
        // this.service.list().
        // subscribe({ next: r => this.data = r, error: () => { } }); 
        
        }

        delete(incident:any) {
        }

        edit(id:any) {
        }
}