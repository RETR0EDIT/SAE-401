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
  private checkLoginUrl: string = 'http://localhost/sae-401/api/login.php';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userId: string = '';
  userRole: string = '';

  constructor(private cookieService: CookieService, private http: HttpClient, private localStorage: LocalStorageService) {
    const savedToken = this.localStorage.getItem('authToken');
    const savedUserRole = this.localStorage.getItem('userRole');
    const savedUserId = this.localStorage.getItem('userId');
    
    if (savedToken) {
      this.token = savedToken;
      this.isLoggedInSubject.next(true);
    }
  
    if (savedUserRole) {
      this.userRole = savedUserRole;
    }

    if (savedUserId) {
      this.userId = savedUserId;
    }
  }

  setToken(token: string, userId: string, role: string): void {
    this.token = token;
    this.userId = userId;
    this.userRole = role;
    this.localStorage.setItem('authToken', token);
    this.localStorage.setItem('userId', userId);
    this.localStorage.setItem('userRole', role);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    this.http.post('http://localhost/SAE-401/api/signout.php', {})
      .subscribe(response => {
        this.token = '';
        this.localStorage.removeItem('authToken');
        this.localStorage.removeItem('userId');
        this.localStorage.removeItem('userRole');
        this.isLoggedInSubject.next(false);
      });
  }

  isUserLoggedIn(): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
  
    return this.http.get(this.checkLoginUrl, { headers, observe: 'response' }).pipe(
      map((response: any) => {
        return response.status === 200;
      }),
      catchError((error: HttpErrorResponse): Observable<boolean> => {
        if (error.status === 401) {
          return of(false);
        }
        return throwError(error);
      })
    );
  }
  
  getUserRole(id_client: string): Observable<string> {
    return this.http.get<any>(`http://localhost/sae-401/api/profil/Read_one.php?id=${id_client}`)
      .pipe(map(response => response.role));
  }
}