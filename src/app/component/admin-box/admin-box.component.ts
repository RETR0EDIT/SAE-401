import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { BoxService } from '../../box.service'; 
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-box',
  templateUrl: './admin-box.component.html',
  styleUrls: ['./admin-box.component.scss']
})
export class AdminBoxComponent implements OnInit {
  boxes$: Observable<any>;
  id_boxe: string = '';
  nom: string = '';
  prix: number = 0;
  image: string = '';
  pieces: string[] = [];
  form: FormGroup;
  errorMessage: string = '';
  showInputs: boolean = false;
  editing: { [key: string]: boolean } = {};
  allSaveurs: any[] = [];
  allAliments: any[] = [];
  saveur: any = this.allSaveurs[0]; 
  aliment: any = this.allAliments[0];

  constructor(private http: HttpClient, private boxService: BoxService, private fb: FormBuilder) {
    this.boxes$ = new Observable<any>();
    this.form = this.fb.group({});
    this.getSaveurs().subscribe(saveurs => {
      this.allSaveurs = saveurs;
      this.getAliments().subscribe(aliments => {
        this.allAliments = aliments;
        this.form = this.fb.group({
          nom: [''],
          prix: [''],
          image: [''],
          pieces: [''],
          saveurs: this.fb.array(this.allSaveurs.map(() => new FormControl(false))),
          aliments: this.fb.array(this.allAliments.map(() => this.fb.group({
            selected: false,
            quantite: 0
          })))
        });
        this.boxes$ = this.getAllBoxes();
      });
    });
  }

  createFormControls(controlName: string, items: any[]) {
    const formArray = this.form.get(controlName) as FormArray;
    items.forEach(() => {
      formArray.push(this.fb.group({
        selected: new FormControl(false),
        quantite: new FormControl(0)
      }));
    });
  }

  ngOnInit(): void {
    this.allSaveurs.forEach((saveur, index) => {
      this.saveurs.push(this.fb.control(saveur.id_saveur));
    });
  
    this.allAliments.forEach((aliment, index) => {
      this.aliments.push(this.fb.control(aliment.id_aliment));
    });
  }

  get saveurs(): FormArray {
    return this.form.controls['saveurs'] as FormArray;
  }
  
  get aliments(): FormArray {
    return this.form.controls['aliments'] as FormArray;
  }

  addSaveur() {
    this.saveurs.push(this.fb.group({
      id_saveur: [''],
      nom_saveur: ['']
    }));
  }
  
  addAliment() {
    this.aliments.push(this.fb.group({
      id_aliment: [''],
      nom_aliment: [''],
      quantite: ['']
    }));
  }
  isSaveurSelected(id_saveur: string): boolean {
    return this.form.value.saveurs.map((s: { id_saveur: string }) => s.id_saveur).includes(id_saveur);
  }
  
  isAlimentSelected(id_aliment: string): boolean {
    return this.form.value.aliments.map((a: { id_aliment: string }) => a.id_aliment).includes(id_aliment);
  }

  removeSaveur(i: number) {
    this.saveurs.removeAt(i);
  }
  
  removeAliment(i: number) {
    this.aliments.removeAt(i);
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
      // Extraire uniquement le nom du fichier de l'image
      const imageName = this.form.value.image.split('\\').pop();
  
      // Filtrer les saveurs et les aliments sélectionnés et renvoyer leurs ID
      const selectedSaveurs = this.form.value.saveurs
        .map((selected: boolean, i: number) => selected ? this.allSaveurs[i].id_saveur : null)
        .filter((id: number) => id !== null);
        const selectedAliments = this.form.value.aliments
  .map((aliment: { selected: boolean, quantite: number }, i: number) => aliment.selected ? { id_aliment: this.allAliments[i].id_aliment, quantite: aliment.quantite } : null)
  .filter((aliment: any) => aliment !== null);
      
  const id_aliment = selectedAliments.map((aliment: { id_aliment: number, quantite: number }) => aliment.id_aliment);
  const quantite = selectedAliments.map((aliment: { id_aliment: number, quantite: number }) => aliment.quantite);
      
      const box = { 
        nom: this.form.value.nom, 
        prix: +this.form.value.prix, 
        image: imageName, 
        pieces: +this.form.value.pieces, 
        id_saveur: selectedSaveurs.map(Number), 
        id_aliment: id_aliment,
        quantite: quantite
      };
  
      console.log('Box à créer :', box); // Ajout du débogage ici
  
      this.http.post('http://localhost/sae-401/api/box/Create.php', box).subscribe(response => {
        console.log('Box créée avec succès :', response);
        this.boxes$ = this.getAllBoxes();
        this.form.reset();
        this.showInputs = false;
      }, error => {
        this.errorMessage = 'Erreur lors de la création de la box : ' + JSON.stringify(error);
        console.log('Erreur lors de la création de la box :', box); // Ajout du débogage ici
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
      this.errorMessage = 'Erreur lors de la suppression de la box : ' + JSON.stringify(error);
    });
  }

  getSaveurs(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost/sae-401/api/saveur/Read.php');
  }

  getAliments(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost/sae-401/api/aliment/Read.php');
  }

  
fileData!: File;

fileProcess(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    this.fileData = target.files[0];
  }
}

uploadFile() {
  const formData = new FormData();
  formData.append('file', this.fileData);
  //mettre le file dans SAE-401\src\assets\ressources\images\box-sushi\carée
  this.http.post('http://localhost/sae-401/api/file/Upload.php', formData).subscribe(response => {
    console.log('Fichier téléversé avec succès :', response);
  }, error => {
    console.error('Erreur lors du téléversement du fichier :', error);
  });
}

clickCount = 0;

addBoxAndUploadFile() {
  this.addBox();
  this.clickCount++;
  if (this.clickCount === 2) {
    this.uploadFile();
    this.clickCount = 0;
  }
}
}
