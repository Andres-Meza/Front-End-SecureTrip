import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsPromotionsService {
  private baseUrl = 'http://127.0.0.1:8000/clientpromotions';

  constructor(private http: HttpClient) {}

  getClientPromotions(clientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/client/${clientId}`);
  }

  addClientPromotion(clientPromotionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, clientPromotionData);
  }

  removeClientPromotion(clientId: number, promotionId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/client/${clientId}/promotion/${promotionId}`);
  }
}
