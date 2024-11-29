import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface PaymentRequest {
  ClientID: number;
  ServiceID: number;
  Amount: number;
  PaymentMethod: string;
  IPAddress: string;
}


export interface PaymentResponse {
  reference: string;
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private baseUrl = 'http://127.0.0.1:8000/payments';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getPayments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, paymentData);
  }

  registerPayment(paymentData: any) {
    return this.http.post(this.baseUrl, paymentData);
  }

  updatePayment(paymentId: number, paymentData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${paymentId}`, paymentData);
  }

  deletePayment(paymentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${paymentId}`);
  }
}
