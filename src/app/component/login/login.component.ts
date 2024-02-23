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
          alert('Connexion réussie !');
          // Redirigez l'utilisateur vers une autre page
          //window.location.href = '/home';
        },
        error => {
          console.error('Une erreur est survenue lors de la connexion :', error);
          alert('Une erreur est survenue lors de la connexion.');
        }
      );
    }
  }
}
/*
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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
          //alert('Connexion réussie !');
          // Redirigez l'utilisateur vers une autre page
          //window.location.href = '/home';
        },
        (error: HttpErrorResponse) => {
          console.error('Une erreur est survenue lors de la connexion :', error);
          let errorMessage = 'Une erreur est survenue lors de la connexion.';
          if (error.status === 0) {
            errorMessage = 'Impossible de se connecter au serveur.';
          } else if (error.status >= 400 && error.status < 500) {
            errorMessage = 'Erreur client, veuillez vérifier vos informations de connexion.';
          } else if (error.status >= 500) {
            errorMessage = 'Erreur serveur, veuillez réessayer plus tard.';
          }
          alert(errorMessage);
        }
      );
    }
  }
}*/