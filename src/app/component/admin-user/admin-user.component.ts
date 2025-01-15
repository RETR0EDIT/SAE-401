import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientService } from '../../client.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent {
  clients$: Observable<any>;
  id_client: string = '';
  nom: string = '';
  prenom: string = '';
  adresse: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string = '';
  showInputs: boolean = false;
  editing: { [key: string]: boolean } = {};
  nombreDeUser: number = 0;

  constructor(private http: HttpClient, private clientService: ClientService) {
    this.clients$ = this.getAllClients();
  }

  getAllClients(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/client/Read.php`).pipe(
      tap((response: any) => {
        this.nombreDeUser = response.length;
      })
    );
  }

  addClient() {
    if (!this.showInputs) {
      this.showInputs = true;
    } else {
      const client = {
        nom: this.nom,
        prenom: this.prenom,
        adresse: this.adresse,
        email: this.email,
        password: this.password,
        role: this.role,
      };
      this.postRequest('client/Create.php', client).subscribe(
        (response) => {
          this.clients$ = this.getAllClients();
          this.resetForm();
          this.showInputs = false;
        },
        (error) => {
          this.handleError(error, 'Erreur lors de la création du client');
        }
      );
    }
  }

  editClient(client: {
    id_client: string;
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    password: string;
    role: string;
  }) {
    if (this.editing[client.id_client]) {
      this.putRequest('client/Update.php', client).subscribe(
        (response) => {
          this.clients$ = this.getAllClients();
          this.errorMessage = '';
        },
        (error) => {
          this.handleError(error, 'Erreur lors de la mise à jour du client');
        }
      );
    }
    this.editing[client.id_client] = !this.editing[client.id_client];
  }

  deleteClient(id_client: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id_client: id_client },
    };

    this.http
      .delete(`${environment.apiUrl}/client/Delete.php`, options)
      .subscribe(
        (response) => {
          this.clients$ = this.getAllClients();
          this.errorMessage = '';
        },
        (error) => {
          this.handleError(error, 'Erreur lors de la suppression du client');
        }
      );
  }

  private postRequest(endpoint: string, body: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${endpoint}`, body);
  }

  private putRequest(endpoint: string, body: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${endpoint}`, body);
  }

  private handleError(error: any, defaultMessage: string) {
    this.errorMessage =
      error.error.message || `${defaultMessage} : ${error.message}`;
  }

  private resetForm() {
    this.id_client = '';
    this.nom = '';
    this.prenom = '';
    this.adresse = '';
    this.email = '';
    this.password = '';
    this.role = '';
  }
}
