import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  constructor(private http: HttpClient) {}

  updateBox(id_boxe: string, nom: string, prix: number, image: string, pieces: string[]): Observable<any> {
    return this.http.put(`http://localhost/sae-401/api/box/Update.php`, { id_boxe, nom, prix, image, pieces });
  }
}