import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private baseUrl = 'http://127.0.0.1:8000/reviews';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  createReview(reviewData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, reviewData);
  }

  updateReview(reviewId: number, reviewData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${reviewId}`, reviewData);
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${reviewId}`);
  }
}
