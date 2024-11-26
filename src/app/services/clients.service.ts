import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private baseUrl = 'http://127.0.0.1:8000/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, clientData);
  }

  getClientByID(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${clientId}`);
  }
  
  updateClient(clientId: number, clientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${clientId}`, clientData);
  }
  deleteClient(clientId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${clientId}`);
  }
}
