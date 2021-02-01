import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getUserBy(id: any): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createUser(user: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/`, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.apiUrl}/users/${id}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateUser(user: any, id: any) {
    return this.http.put(`${this.apiUrl}/users/${id}`, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}


