import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private baseUrl = 'http://127.0.0.1:8000/cities';

  constructor(private http: HttpClient) {}

  getCities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getCitiesWithCountries(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/with-countries`);
  }

  createCity(cityData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, cityData);
  }

  updateCity(cityId: number, cityData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${cityId}`, cityData);
  }

  deleteCity(CityID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${CityID}`);
  }
}
