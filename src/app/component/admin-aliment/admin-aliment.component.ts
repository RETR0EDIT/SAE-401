import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlimentService } from '../../aliment.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-admin-aliment',
  templateUrl: './admin-aliment.component.html',
  styleUrls: ['./admin-aliment.component.scss'],
})
export class AdminAlimentComponent {
  aliments$: Observable<any>;
  nombreDaliment: number = 0;
  nom_aliment: string = '';
  errorMessage: string = '';
  showInputs: boolean = false;
  editing: { [key: string]: boolean } = {};

  constructor(
    private http: HttpClient,
    private alimentService: AlimentService
  ) {
    this.aliments$ = this.getAllAliments();
  }

  getAllAliments(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/aliment/Read.php`).pipe(
      tap((response: any) => {
        this.nombreDaliment = response.length;
      })
    );
  }

  addAliment() {
    if (!this.showInputs) {
      this.showInputs = true;
    } else {
      const aliment = { nom_aliment: this.nom_aliment };
      this.postRequest('aliment/Create.php', aliment).subscribe(
        (response) => {
          console.log('Aliment créé avec succès :', response);
          this.aliments$ = this.getAllAliments();
          this.nom_aliment = '';
          this.showInputs = false;
        },
        (error) => {
          this.handleError(error, "Erreur lors de la création de l'aliment");
        }
      );
    }
  }

  editAliment(id_aliment: string, nom_aliment: string) {
    if (this.editing[id_aliment]) {
      const aliment = { id_aliment, nom_aliment };
      this.putRequest('aliment/Update.php', aliment).subscribe(
        (response) => {
          console.log('Aliment mis à jour avec succès :', response);
          this.aliments$ = this.getAllAliments();
          this.errorMessage = '';
        },
        (error) => {
          this.handleError(error, "Erreur lors de la mise à jour de l'aliment");
        }
      );
    }
    this.editing[id_aliment] = !this.editing[id_aliment];
  }

  deleteAliment(id_aliment: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id_aliment: id_aliment },
    };

    this.http
      .delete(`${environment.apiUrl}/aliment/Delete.php`, options)
      .subscribe(
        (response) => {
          console.log('Aliment supprimé avec succès :', response);
          this.aliments$ = this.getAllAliments();
          this.errorMessage = '';
        },
        (error) => {
          this.handleError(error, "Erreur lors de la suppression de l'aliment");
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
    if (error.status === 409) {
      this.errorMessage =
        "L'aliment existe déjà. ID de l'aliment : " + error.error.id_aliment;
    } else if (error.status === 503) {
      this.errorMessage = 'Impossible de traiter la requête.';
    } else if (error.status === 400) {
      this.errorMessage = 'Les données sont incomplètes.';
    } else if (error.status === 405) {
      this.errorMessage = 'Méthode non autorisée.';
    } else if (error.status === 404) {
      this.errorMessage = "L'aliment n'existe pas.";
    } else {
      this.errorMessage = `${defaultMessage} : ${error.message}`;
    }
  }
}
