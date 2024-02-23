import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  is_logged_in: boolean;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent {
  constructor(private http: HttpClient) { }
ngOnInit() {
  this.http.get<LoginResponse>('http://localhost/sae-401/api/check-login.php').subscribe(
    response => {
      // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      if (!response.is_logged_in) {
        window.location.href = 'http://localhost:4200/login';
      }
    },
    error => {
      console.error('Une erreur est survenue lors de la vérification de la connexion.', error);
    }
  );
}
}