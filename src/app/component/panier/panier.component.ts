import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface LoginResponse {
  message: string;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent {
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<LoginResponse>('http://localhost/sae-401/api/check-login.php', { withCredentials: true }).subscribe(
      response => {
        // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
        if (response && response.message === "Vous n'êtes pas connecté.") {
          window.location.href = 'http://localhost:4200/login';
        }
      },
      (error: HttpErrorResponse) => {
      
        if (error.status === 401) {
          window.location.href = 'http://localhost:4200/login';
        } else if (error.status === 200) {
          
        }
        else {
          console.error('Une erreur est survenue lors de la vérification de la connexion.', error);
        }
      }
    );
  }
}