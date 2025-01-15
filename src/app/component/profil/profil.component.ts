import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

interface User {
  nom: string;
  prenom: string;
  email: string;
  adresse: string;
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  user: User | undefined;
  achats: any[] = [];
  isEditing = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const id_client = localStorage.getItem('userId');
    if (id_client) {
      this.getProfilInfo(id_client).subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des informations du profil :',
            error
          );
        }
      );
      this.getAchats(id_client).subscribe(
        (response) => {
          this.achats = response;
          console.log(this.achats);
        },
        (error) => {
          console.error('Erreur lors de la récupération des achats :', error);
        }
      );
    } else {
      console.error('User ID is undefined');
    }
  }

  getProfilInfo(id_client: string): Observable<any> {
    const url = `${environment.apiUrl}/profil/Read_one.php?id=${id_client}`;
    return this.http.get(url);
  }

  getAchats(id_client: string): Observable<any> {
    const url = `${environment.apiUrl}/acheter/Read_one.php?id=${id_client}`;
    return this.http.get(url);
  }

  addSpacesToSaveurs(saveurs: any): string {
    if (Array.isArray(saveurs)) {
      return saveurs.join(', ');
    } else if (typeof saveurs === 'string') {
      return saveurs.replace(/,/g, ', ');
    } else {
      console.error('saveurs is not a string or array:', saveurs);
      return '';
    }
  }

  modifier() {
    if (!this.isEditing) {
      this.isEditing = true;
    } else {
      this.http
        .put(`${environment.apiUrl}/client/Update.php`, this.user)
        .subscribe(
          (response) => {
            console.log(response);
            this.isEditing = false;
          },
          (error) => {
            console.error('Erreur lors de la mise à jour du profil :', error);
          }
        );
    }
  }
}
