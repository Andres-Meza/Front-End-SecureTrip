import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

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
    return this.http.post<any>(`${this.baseUrl}`, countryData).pipe(
      catchError(error => {
        console.error('Error detallado:', error);
        
        // Si hay detalles específicos del error, imprímelos
        if (error.error && error.error.detail) {
          console.error('Detalles del error:', error.error.detail);
        }
        
        return throwError(error);
      })
    );
  }

  updateCountry(CountryID: number, countryData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${CountryID}`, countryData);
  }

  deleteCountry(countryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${countryId}`);
  }
}
