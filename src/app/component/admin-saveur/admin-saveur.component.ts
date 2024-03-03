import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveurService } from '../../saveur.service'; 

@Component({
  selector: 'app-admin-saveur',
  templateUrl: './admin-saveur.component.html',
  styleUrls: ['./admin-saveur.component.scss']
})
export class AdminSaveurComponent {
  saveurs$: Observable<any>;
  nom_saveur: string = '';
  errorMessage: string = '';
  showInputs: boolean = false;
  editing: { [key: string]: boolean } = {};
  constructor(private http: HttpClient, private saveurService: SaveurService) {
    this.saveurs$ = this.getAllSaveurs();
  }

  getAllSaveurs(): Observable<any> {
    return this.http.get('http://localhost/sae-401/api/saveur/Read.php');
  }

  addSaveur() {
    if (!this.showInputs) {
      this.showInputs = true;
    } else {
      const saveur = { nom_saveur: this.nom_saveur };
      this.http.post('http://localhost/sae-401/api/saveur/Create.php', saveur).subscribe(response => {
        console.log('Saveur créée avec succès :', response);
        this.saveurs$ = this.getAllSaveurs();
        this.nom_saveur = '';
        this.showInputs = false;
      }, error => {
        if (error.status === 409) {
          this.errorMessage = 'La saveur existe déjà. ID de la saveur : ' + error.error.id_saveur;
        } else if (error.status === 503) {
          this.errorMessage = 'Impossible de créer la saveur.';
        } else if (error.status === 400) {
          this.errorMessage = 'Impossible de créer la saveur. Les données sont incomplètes.';
        } else if (error.status === 405) {
          this.errorMessage = 'Méthode non autorisée.';
        } else {
          this.errorMessage = 'Erreur lors de la création de la saveur : ' + error;
        }
      });
    }
  }

  editSaveur(id_saveur: string, nom_saveur: string) {
    if (this.editing[id_saveur]) {
      this.saveurService.updateSaveur(id_saveur, nom_saveur).subscribe(response => {
        console.log('Saveur mise à jour avec succès :', response);
        this.saveurs$ = this.getAllSaveurs();
        this.errorMessage = ''; 
      }, error => {
        console.error('Erreur lors de la mise à jour de la saveur :', error);
        this.errorMessage = error.error.message; 
      });
    }
    this.editing[id_saveur] = !this.editing[id_saveur];
  }

  deleteSaveur(id_saveur: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id_saveur: id_saveur,
      },
    };
  
    this.http.delete('http://localhost/sae-401/api/saveur/Delete.php', options).subscribe(response => {
      console.log('Saveur supprimée avec succès :', response);
      this.saveurs$ = this.getAllSaveurs();
      this.errorMessage = '';
    }, error => {
      if (error.status === 404) {
        this.errorMessage = 'La saveur n\'existe pas.';
      } else if (error.status === 503) {
        this.errorMessage = 'Impossible de supprimer la saveur.';
      } else {
        this.errorMessage = 'Erreur lors de la suppression de la saveur : ' + error;
      }
    });
  }
}