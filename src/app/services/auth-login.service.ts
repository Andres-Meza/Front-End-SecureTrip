import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  private baseUrl = 'http://127.0.0.1:8000/logins';

  constructor(private http: HttpClient) {}

  login(Email: string, Password: string): Observable<any> {
    return this.http.post(this.baseUrl, { Email: Email, Password: Password })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError(() => new Error('Credenciales incorrectas'));
    }
    if (error.status === 403) {
      return throwError(() => new Error('Cuenta bloqueada'));
    }
    return throwError(() => new Error('Error en el inicio de sesión'));
  }
}
