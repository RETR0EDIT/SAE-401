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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let id_client = localStorage.getItem('userId');
    if (id_client) {
      this.getProfilInfo(id_client).subscribe(response => {
        this.user = response;
       
      });
    } else {
      console.error('User ID is undefined');
    }
  }

  getProfilInfo(id_client: string): Observable<any> {
    const url = `http://localhost/sae-401/api/profil/Read_one.php?id=${id_client}`;
    return this.http.get(url);
  }
}