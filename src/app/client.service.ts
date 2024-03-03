import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}

  updateClient(id_client: string, nom: string, prenom: string, adresse: string, email: string, password: string, role: string): Observable<any> {
    return this.http.put(`http://localhost/sae-401/api/client/Update.php`, { id_client, nom, prenom, adresse, email, password, role });
  }
}