import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BoxService } from '../../box.service'; 

@Component({
  selector: 'app-admin-box',
  templateUrl: './admin-box.component.html',
  styleUrls: ['./admin-box.component.scss']
})
export class AdminBoxComponent {
  boxes$: Observable<any>;
  id_boxe: string = '';
  nom: string = '';
  prix: number = 0;
  image: string = '';
  pieces: string[] = [];
  nom_saveur: string = '';
  nom_aliment: string = '';
  errorMessage: string = '';
  showInputs: boolean = false;
  editing: { [key: string]: boolean } = {};

  constructor(private http: HttpClient, private boxService: BoxService) {
    this.boxes$ = this.getAllBoxes();
  }

  getAllBoxes(): Observable<any> {
    return this.http.get('http://localhost/sae-401/api/box/Read.php');
  }

  addBox() {
    console.log('add box');
    if (!this.showInputs) {
      console.log('show input');
      this.showInputs = true;
    } else {
      const box = { id_boxe: this.id_boxe, nom: this.nom, prix: this.prix, image: this.image, pieces: this.pieces, nom_aliment: this.nom_aliment, nom_saveur: this.nom_saveur};
      this.http.post('http://localhost/sae-401/api/box/Create.php', box).subscribe(response => {
        console.log('Box créée avec succès :', response);
        this.boxes$ = this.getAllBoxes();
        this.id_boxe = '';
        this.nom = '';
        this.prix = 0;
        this.image = '';
        this.pieces = [];
        this.nom_aliment = '';
        this.nom_saveur = '';
        this.showInputs = false;
      }, error => {
        this.errorMessage = 'Erreur lors de la création de la box : ' + error;
      });
    }
  }

  editBox(id_boxe: string, nom: string, prix: number, image: string, pieces: string[]) {
    if (this.editing[id_boxe]) {
      this.boxService.updateBox(id_boxe, nom, prix, image, pieces).subscribe(response => {
        console.log('Box mise à jour avec succès :', response);
        this.boxes$ = this.getAllBoxes();
        this.errorMessage = ''; 
      }, error => {
        console.error('Erreur lors de la mise à jour de la box :', error);
        this.errorMessage = error.error.message; 
      });
    }
    this.editing[id_boxe] = !this.editing[id_boxe];
  }

  deleteBox(id_boxe: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id_boxe: id_boxe,
      },
    };
  
    this.http.delete('http://localhost/sae-401/api/box/Delete.php', options).subscribe(response => {
      console.log('Box supprimée avec succès :', response);
      this.boxes$ = this.getAllBoxes();
      this.errorMessage = '';
    }, error => {
      this.errorMessage = 'Erreur lors de la suppression de la box : ' + error;
    });
  }
}