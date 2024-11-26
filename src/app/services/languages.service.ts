import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguagesService {
  private baseUrl = 'http://127.0.0.1:8000/languages';
  
  constructor(private http: HttpClient) {}

  getLanguages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createLanguage(languageData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, languageData);
  }

  updateLanguage(languageId: number, languageData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${languageId}`, languageData);
  }

  deleteLanguage(languageId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${languageId}`);
  }
}
