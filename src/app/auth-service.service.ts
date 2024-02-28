import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string = '';
  private checkLoginUrl: string = 'http://your-api-url.com/check-login';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private cookieService: CookieService, private http: HttpClient, private localStorage: LocalStorageService) {
   
    const savedToken = this.localStorage.getItem('authToken');
    if (savedToken) {
      this.token = savedToken;
      this.isLoggedInSubject.next(true);
    }
  }

  setToken(token: string, userId: string): void {
    this.token = token;
    
    this.localStorage.setItem('authToken', token);
    this.localStorage.setItem('userId', userId);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    this.http.post('http://localhost/SAE-401/api/signout.php', {})
      .subscribe(response => {
        this.token = '';
        this.localStorage.removeItem('authToken');
        this.isLoggedInSubject.next(false);
      }, error => {
        console.error('Erreur lors de la déconnexion :', error);
      });
  }


  isUserLoggedIn(): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
  
    return this.http.get(this.checkLoginUrl, { headers, observe: 'response' }).pipe(
      map((response: any) => {
        console.log('Response from server:', response);
        return response.status === 200;
      }),
      catchError((error: HttpErrorResponse): Observable<boolean> => {
        console.error('Error occurred:', error.message, 'Error details:', error);
        if (error.status === 401) {
          return of(false);
        }
        return throwError(error);
      })
    );
  }
}