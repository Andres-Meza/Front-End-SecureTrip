import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private baseUrl = 'http://127.0.0.1:8000/payments';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, paymentData);
  }

  updatePayment(paymentId: number, paymentData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${paymentId}`, paymentData);
  }

  deletePayment(paymentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${paymentId}`);
  }
}
