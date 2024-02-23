import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface ApiResponse {
  success?: string;
  error?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('form') form!: NgForm;
  formData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    console.log('Submitting form...');
    if (this.form && this.form.valid) {
      console.log('Form is valid. Form data:', this.formData);
      this.http.post<ApiResponse>('http://localhost/sae-401/api/login.php', this.formData).subscribe(
        response => {
          console.log('Received response from server:', response);
          if (response) {
            if (response.success) {
              console.log('Login successful. Redirecting...');
              alert(response.success);
              this.router.navigate(['/']); // Redirigez l'utilisateur vers la page d'accueil
            } else if (response.error) {
              console.log('Login failed with error:', response.error);
              alert(response.error);
            }
          }
        },
        error => {
          console.log('An error occurred while connecting:', error);
          console.error('Une erreur est survenue lors de la connexion.', error);
        }
      );
    } else {
      console.log('Form is not valid or not present.');
    }
  }
}