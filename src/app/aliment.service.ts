import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {
  constructor(private http: HttpClient) {}

  updateAliment(id_aliment: string, nom_aliment: string): Observable<any> {
    return this.http.put(`http://localhost/sae-401/api/aliment/Update.php`, { id_aliment, nom_aliment });
  }
}