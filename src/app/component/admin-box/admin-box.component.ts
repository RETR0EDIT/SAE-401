import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BoxService } from '../../box.service';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-admin-box',
  templateUrl: './admin-box.component.html',
  styleUrls: ['./admin-box.component.scss'],
})
export class AdminBoxComponent implements OnInit {
  boxes$: Observable<any> = of();
  form: FormGroup;
  errorMessage: string = '';
  showInputs: boolean = false;
  editing: { [key: string]: boolean } = {};
  allSaveurs: any[] = [];
  allAliments: any[] = [];
  nombreDebox: number = 0;
  fileData!: File;
  clickCount = 0;

  constructor(
    private http: HttpClient,
    private boxService: BoxService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nom: [''],
      prix: [''],
      image: [''],
      pieces: [''],
      saveurs: this.fb.array([]),
      aliments: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  get saveurs(): FormArray {
    return this.form.controls['saveurs'] as FormArray;
  }

  get aliments(): FormArray {
    return this.form.controls['aliments'] as FormArray;
  }

  loadInitialData() {
    this.getSaveurs().subscribe((saveurs) => {
      this.allSaveurs = saveurs;
      this.getAliments().subscribe((aliments) => {
        this.allAliments = aliments;
        this.createFormControls('saveurs', this.allSaveurs);
        this.createFormControls('aliments', this.allAliments);
        this.boxes$ = this.getAllBoxes();
      });
    });
  }

  createFormControls(controlName: string, items: any[]) {
    const formArray = this.form.get(controlName) as FormArray;
    items.forEach(() => {
      formArray.push(
        this.fb.group({
          selected: new FormControl(false),
          quantite: new FormControl(0),
        })
      );
    });
  }

  getAllBoxes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/box/Read.php`).pipe(
      tap((response: any) => {
        this.nombreDebox = response.length;
      })
    );
  }

  addBox() {
    if (!this.showInputs) {
      this.showInputs = true;
    } else {
      const box = this.prepareBoxData();
      this.postRequest('box/Create.php', box).subscribe(
        (response) => {
          console.log('Box créée avec succès :', response);
          this.boxes$ = this.getAllBoxes();
          this.form.reset();
          this.showInputs = false;
        },
        (error) => {
          this.errorMessage =
            'Erreur lors de la création de la box : ' + JSON.stringify(error);
        }
      );
    }
  }

  prepareBoxData() {
    const imageName = this.form.value.image.split('\\').pop();
    const selectedSaveurs = this.form.value.saveurs
      .map((selected: boolean, i: number) =>
        selected ? this.allSaveurs[i].id_saveur : null
      )
      .filter((id: number) => id !== null);
    const selectedAliments = this.form.value.aliments
      .map((aliment: { selected: boolean; quantite: number }, i: number) =>
        aliment.selected
          ? {
              id_aliment: this.allAliments[i].id_aliment,
              quantite: aliment.quantite,
            }
          : null
      )
      .filter((aliment: any) => aliment !== null);

    return {
      nom: this.form.value.nom,
      prix: +this.form.value.prix,
      image: imageName,
      pieces: +this.form.value.pieces,
      id_saveur: selectedSaveurs.map(Number),
      id_aliment: selectedAliments.map((a: any) => a.id_aliment),
      quantite: selectedAliments.map((a: any) => a.quantite),
    };
  }

  isSaveurSelected(id_saveur: string): boolean {
    return this.form.value.saveurs
      .map((s: { id_saveur: string }) => s.id_saveur)
      .includes(id_saveur);
  }

  editBox(
    id_boxe: string,
    nom: string,
    prix: number,
    image: string,
    pieces: string[]
  ) {
    if (this.editing[id_boxe]) {
      const box = { id_boxe, nom, prix, image, pieces };
      this.putRequest('box/Update.php', box).subscribe(
        (response) => {
          console.log('Box mise à jour avec succès :', response);
          this.boxes$ = this.getAllBoxes();
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage =
            'Erreur lors de la mise à jour de la box : ' +
            JSON.stringify(error);
        }
      );
    }
    this.editing[id_boxe] = !this.editing[id_boxe];
  }

  deleteBox(id_boxe: string) {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id_boxe: id_boxe },
    };

    this.http.delete(`${environment.apiUrl}/box/Delete.php`, options).subscribe(
      (response) => {
        console.log('Box supprimée avec succès :', response);
        this.boxes$ = this.getAllBoxes();
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage =
          'Erreur lors de la suppression de la box : ' + JSON.stringify(error);
      }
    );
  }

  getSaveurs(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/saveur/Read.php`);
  }

  getAliments(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/aliment/Read.php`);
  }

  fileProcess(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.fileData = target.files[0];
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.postRequest('file/Upload.php', formData).subscribe(
      (response) => {
        console.log('Fichier téléversé avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors du téléversement du fichier :', error);
      }
    );
  }

  addBoxAndUploadFile() {
    this.addBox();
    this.clickCount++;
    if (this.clickCount === 2) {
      this.uploadFile();
      this.clickCount = 0;
    }
  }

  private postRequest(endpoint: string, body: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${endpoint}`, body);
  }

  private putRequest(endpoint: string, body: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${endpoint}`, body);
  }
}
