import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelPlanningsService {
  private baseUrl = 'http://127.0.0.1:8000/travelplannings';

  constructor(private http: HttpClient) {}

  getTravelPlans(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createTravelPlan(planData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, planData);
  }

  updateTravelPlan(planId: number, planData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${planId}`, planData);
  }

  deleteTravelPlan(planId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${planId}`);
  }
}
