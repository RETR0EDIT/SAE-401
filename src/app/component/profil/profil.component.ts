import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  nom: string;
  prenom: string;
  email: string;
  adresse: string;

}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user: User | undefined;
  achats: any[] = [];
  isEditing = false;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let id_client = localStorage.getItem('userId');
    if (id_client) {
      this.getProfilInfo(id_client).subscribe(response => {
        this.user = response;
      });
      this.getAchats(id_client).subscribe(response => {
        this.achats = response;
        console.log(this.achats);
      });
    } else {
      console.error('User ID is undefined');
    }
  }

  getProfilInfo(id_client: string): Observable<any> {
    const url = `http://localhost/SAE-401/api/profil/Read_one.php?id=${id_client}`;
    return this.http.get(url);
  }
  getAchats(id_client: string): Observable<any> {

    const url = `http://localhost/SAE-401/api/acheter/Read_one.php?id=${id_client}`;
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
      this.http.put('http://localhost/SAE-401/api/client/Update.php', this.user).subscribe(response => {
        console.log(response);
        this.isEditing = false;
      });
    }
  }
}