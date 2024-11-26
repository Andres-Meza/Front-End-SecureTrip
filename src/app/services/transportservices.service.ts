import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransportServicesService {
  private baseUrl = 'http://127.0.0.1:8000/transportservices';

  constructor(private http: HttpClient) {}

  getTransportServices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createTransportService(transportServiceData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, transportServiceData);
  }

  updateTransportService(transportServiceId: number, transportServiceData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${transportServiceId}`, transportServiceData);
  }

  deleteTransportService(transportServiceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${transportServiceId}`);
  }
}
