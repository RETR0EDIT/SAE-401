import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveurService {
  constructor(private http: HttpClient) {}

  updateSaveur(id_saveur: string, nom_saveur: string): Observable<any> {
    return this.http.put(`http://localhost/sae-401/api/saveur/Update.php`, { id_saveur, nom_saveur });
  }
}