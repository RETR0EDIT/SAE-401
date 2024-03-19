import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientService } from '../../client.service'; 


@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
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
    return this.http.get('http://localhost/sae-401/api/client/Read.php').pipe(
      tap((response: any) => {
        this.nombreDeUser = response.length; // Mettez à jour le nombre d'utilisateurs
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
        role: this.role
      };
      this.http.post('http://localhost/sae-401/api/client/Create.php', client).subscribe(response => {
        this.clients$ = this.getAllClients();
        this.id_client = '';
        this.nom = '';
        this.prenom = '';
        this.adresse = '';
        this.email = '';
        this.password = '';
        this.role = '';
        this.showInputs = false;
        this.errorMessage = '';
      }, error => {
        this.errorMessage = error.error.message;
      });
    }
  }

  editClient(client: { id_client: string, nom: string, prenom: string, adresse: string, email: string, password: string, role: string }) {
    if (this.editing[client.id_client]) {
      this.clientService.updateClient(client.id_client, client.nom, client.prenom, client.adresse, client.email, client.password, client.role).subscribe(response => {
        this.clients$ = this.getAllClients();
        this.errorMessage = ''; 
      }, error => {
        console.error('Erreur lors de la mise à jour du client :', error);
        this.errorMessage = error.error.message; 
      });
    }
    this.editing[client.id_client] = !this.editing[client.id_client];
  }

  deleteClient(id_client: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id_client: id_client,
      },
    };
  
    this.http.delete('http://localhost/sae-401/api/client/Delete.php', options).subscribe(response => {
      this.clients$ = this.getAllClients();
      this.errorMessage = '';
    }, error => {
      console.error('Erreur lors de la suppression du client :', error);
      this.errorMessage = error.error.message;
    });
  }
}