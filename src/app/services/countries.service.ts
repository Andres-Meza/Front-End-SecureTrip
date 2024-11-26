import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl = 'http://127.0.0.1:8000/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createCountry(countryData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, countryData);
  }

  updateCountry(countryId: number, countryData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${countryId}`, countryData);
  }

  deleteCountry(countryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${countryId}`);
  }
}
