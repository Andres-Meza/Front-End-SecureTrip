import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollaboratorsService {
  private baseUrl = 'http://127.0.0.1:8000/collaborators';

  constructor(private http: HttpClient) {}

  getCollaborators(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getCollaboratorByID(collaboratorId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${collaboratorId}`);
  }

  createCollaborator(collaboratorData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, collaboratorData);
  }

  updateCollaborator(collaboratorId: number, collaboratorData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${collaboratorId}`, collaboratorData);
  }
  
  deleteCollaborator(collaboratorId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${collaboratorId}`);
  }
}
