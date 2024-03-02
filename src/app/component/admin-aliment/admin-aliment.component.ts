import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AlimentService } from '../../aliment.service'; 



@Component({
  selector: 'app-admin-aliment',
  templateUrl: './admin-aliment.component.html',
  styleUrls: ['./admin-aliment.component.scss']
})
export class AdminAlimentComponent {
  aliments$: Observable<any>;
  nom_aliment: string = '';
  errorMessage: string = '';
  showInputs: boolean = false;
  editing: { [key: string]: boolean } = {};
  constructor(private http: HttpClient, private alimentService: AlimentService) {
    this.aliments$ = this.getAllAliments();
  }

  getAllAliments(): Observable<any> {
    return this.http.get('http://localhost/sae-401/api/aliment/Read.php');
  }

 

  //addAliment
  addAliment() {
    if (!this.showInputs) {
      this.showInputs = true;
    } else {
      const aliment = { nom_aliment: this.nom_aliment };
      this.http.post('http://localhost/sae-401/api/aliment/Create.php', aliment).subscribe(response => {
        console.log('Aliment créé avec succès :', response);
        this.aliments$ = this.getAllAliments();
        
        this.nom_aliment = '';
        this.showInputs = false;
      }, error => {
        if (error.status === 409) {
          this.errorMessage = 'L\'aliment existe déjà. ID de l\'aliment : ' + error.error.id_aliment;
        } else if (error.status === 503) {
          this.errorMessage = 'Impossible de créer l\'aliment.';
        } else if (error.status === 400) {
          this.errorMessage = 'Impossible de créer l\'aliment. Les données sont incomplètes.';
        } else if (error.status === 405) {
          this.errorMessage = 'Méthode non autorisée.';
        } else {
          this.errorMessage = 'Erreur lors de la création de l\'aliment : ' + error;
        }
      });
    }
  }



//editAliment
// Ajoutez une nouvelle propriété à votre composant pour suivre l'état d'édition de chaque aliment


editAliment(id_aliment: string, nom_aliment: string) {
  if (this.editing[id_aliment]) {
    this.alimentService.updateAliment(id_aliment, nom_aliment).subscribe(response => {
      console.log('Aliment mis à jour avec succès :', response);
      this.aliments$ = this.getAllAliments();
      this.errorMessage = ''; 
    }, error => {
      console.error('Erreur lors de la mise à jour de l\'aliment :', error);
      this.errorMessage = error.error.message; // Enregistre le message d'erreur
    });
  }
  this.editing[id_aliment] = !this.editing[id_aliment];
}


  //deleteAliment
  deleteAliment(id_aliment: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id_aliment: id_aliment,
      },
    };
  
    this.http.delete('http://localhost/sae-401/api/aliment/Delete.php', options).subscribe(response => {
      console.log('Aliment supprimé avec succès :', response);
      this.aliments$ = this.getAllAliments();
      this.errorMessage = '';
    }, error => {
      if (error.status === 404) {
        this.errorMessage = 'L\'aliment n\'existe pas.';
      } else if (error.status === 503) {
        this.errorMessage = 'Impossible de supprimer l\'aliment.';
      } else {
        this.errorMessage = 'Erreur lors de la suppression de l\'aliment : ' + error;
      }
    });
  }
}