import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicePlanningsService {
  private baseUrl = 'http://127.0.0.1:8000/serviceplannings';

  constructor(private http: HttpClient) {}

  getServicePlannings(planId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/plan/${planId}`);
  }

  addServiceToPlanning(servicePlanningData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, servicePlanningData);
  }

  removeServiceFromPlanning(planId: number, serviceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/plan/${planId}/service/${serviceId}`);
  }
}
