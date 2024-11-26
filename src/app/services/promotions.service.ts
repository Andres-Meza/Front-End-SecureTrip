import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionsService {
  private baseUrl = 'http://127.0.0.1:8000/promotions';

  constructor(private http: HttpClient) {}

  getPromotions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createPromotion(promotionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, promotionData);
  }

  updatePromotion(promotionId: number, promotionData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${promotionId}`, promotionData);
  }

  deletePromotion(promotionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${promotionId}`);
  }
}
