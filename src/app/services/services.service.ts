import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private baseUrl = 'http://127.0.0.1:8000/services';

  constructor(private http: HttpClient) {}

  getServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createService(serviceData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, serviceData);
  }

  updateService(serviceId: number, serviceData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${serviceId}`, serviceData);
  }

  deleteService(serviceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${serviceId}`);
  }
}
