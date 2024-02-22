import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private http: HttpClient) { }

  onSubmit(event: Event) {
    event.preventDefault();
    

    const target = event.target as HTMLFormElement;
    const emailElement = target.querySelector('input[name="email"]') as HTMLInputElement;
    const passwordElement = target.querySelector('input[name="password"]') as HTMLInputElement;
    
    if (emailElement && passwordElement) {
      const email = emailElement.value;
      const password = passwordElement.value;
    
      this.http.post('http://localhost/sae-401/api/login.php', { email, password }).subscribe(
        response => {
          console.log(response);
          // Affichez votre message de confirmation ici
          //alert('Connexion réussie !');
          // Redirigez l'utilisateur vers une autre page
          //window.location.href = '/home';
        },
        error => {
          console.error('Une erreur est survenue lors de la connexion :', error);
          // Vous pouvez également afficher un message d'erreur ici
          alert('Une erreur est survenue lors de la connexion.');
        }
      );
    }
  }
}