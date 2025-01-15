import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SaveurService } from '../../saveur.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-admin-saveur',
  templateUrl: './admin-saveur.component.html',
  styleUrls: ['./admin-saveur.component.scss'],
})
export class AdminSaveurComponent {
  saveurs$: Observable<any>;
  nom_saveur: string = '';
  errorMessage: string = '';
  showInputs: boolean = false;
  editing: { [key: string]: boolean } = {};
  nombreDeSaveur: number = 0;

  constructor(private http: HttpClient, private saveurService: SaveurService) {
    this.saveurs$ = this.getAllSaveurs();
  }

  getAllSaveurs(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/saveur/Read.php`).pipe(
      tap((response: any) => {
        this.nombreDeSaveur = response.length;
      })
    );
  }

  addSaveur() {
    if (!this.showInputs) {
      this.showInputs = true;
    } else {
      const saveur = { nom_saveur: this.nom_saveur };
      this.postRequest('saveur/Create.php', saveur).subscribe(
        (response) => {
          console.log('Saveur créée avec succès :', response);
          this.saveurs$ = this.getAllSaveurs();
          this.nom_saveur = '';
          this.showInputs = false;
        },
        (error) => {
          this.handleError(error, 'Erreur lors de la création de la saveur');
        }
      );
    }
  }

  editSaveur(id_saveur: string, nom_saveur: string) {
    if (this.editing[id_saveur]) {
      const saveur = { id_saveur, nom_saveur };
      this.putRequest('saveur/Update.php', saveur).subscribe(
        (response) => {
          console.log('Saveur mise à jour avec succès :', response);
          this.saveurs$ = this.getAllSaveurs();
          this.errorMessage = '';
        },
        (error) => {
          this.handleError(error, 'Erreur lors de la mise à jour de la saveur');
        }
      );
    }
    this.editing[id_saveur] = !this.editing[id_saveur];
  }

  deleteSaveur(id_saveur: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id_saveur: id_saveur },
    };

    this.http
      .delete(`${environment.apiUrl}/saveur/Delete.php`, options)
      .subscribe(
        (response) => {
          console.log('Saveur supprimée avec succès :', response);
          this.saveurs$ = this.getAllSaveurs();
          this.errorMessage = '';
        },
        (error) => {
          this.handleError(error, 'Erreur lors de la suppression de la saveur');
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
        'La saveur existe déjà. ID de la saveur : ' + error.error.id_saveur;
    } else if (error.status === 503) {
      this.errorMessage = 'Impossible de traiter la requête.';
    } else if (error.status === 400) {
      this.errorMessage = 'Les données sont incomplètes.';
    } else if (error.status === 405) {
      this.errorMessage = 'Méthode non autorisée.';
    } else if (error.status === 404) {
      this.errorMessage = "La saveur n'existe pas.";
    } else {
      this.errorMessage = `${defaultMessage} : ${error.message}`;
    }
  }
}
