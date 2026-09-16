import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AssignIncidentRequest, Incident, PageResponse, UpdateIncidentRequest, UserResponse } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080/api/incidents';
  private base1 = 'http://localhost:8080/api/user';
  create(payload: {
    title: string; description: string; category: string;
    priority: string;  
  }) {
    return this.http.post<Incident>(this.base, payload);
  }

  list(page = 0, size = 20, status?: string, priority?: string) {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    if (priority) params = params.set('priority', priority);
    return this.http.get<PageResponse<Incident>>(this.base, { params });
  }

  getAllIncidents():  Observable<Incident[]>{
   
    return this.http.get<Incident[]>(`${this.base}/getAllIncident`);
  }

  get(id: number) {
    return this.http.get<Incident>(`${this.base}/${id}`);
  }

  updateStatus(id: number, status: string) {
    return this.http.patch<Incident>(`${this.base}/${id}/status`, { status });
  }

  assign(id: number, userId: number) {
    return this.http.patch<Incident>(`${this.base}/${id}/assign/${userId}`, {});
  }

   getIncidentById(id: number): Observable<Incident> {
    return this.http.get<Incident>(
      `${this.base}/${id}`
    );
  }


  getUserDetail(id:any): Observable<UserResponse> {
     return this.http.get<UserResponse>(`${this.base1}/${id}`);
      
    }


      getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `${this.base1}/users`
    );
  }

  /**
   * Update existing incident
   */
  updateIncident(
    id: number,
    request: UpdateIncidentRequest
  ): Observable<Incident> {

    return this.http.put<Incident>(
      `${this.base}/${id}`,
      request
    );
  }


   assignIncident(
    incidentId: number,
    request: AssignIncidentRequest
  ): Observable<Incident> {

    return this.http.put<Incident>(
      `${this.base}/incidents/${incidentId}/assign`,
      request
    );
  }
}