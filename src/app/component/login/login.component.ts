import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service.service'; 

interface ApiResponse {
  success?: string;
  id_client?: string;
  nom?: string;
  prenom?: string;
  adresse?: string;
  email?: string;
  password?: string;
  role?: string;
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

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { } // Injectez AuthService

  onSubmit() {
    
    if (this.form && this.form.valid) {
      
      this.http.post<ApiResponse>('http://localhost/sae-401/api/login.php', this.formData, { withCredentials: true }).subscribe(
        response => {
         
          if (response) {
            if (response.success) {
              console.log('Login successful. Redirecting...');
              
              if (response.success && response.id_client) {
                this.authService.setToken(response.success, response.id_client, '');
                this.authService.getUserRole(response.id_client).subscribe(role => {
                  this.authService.userRole = role;
                }, error => {
                  console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
                });
                this.router.navigate(['/']); 
              } else {
                
                console.error('User ID is undefined');
              }
              this.router.navigate(['/']);
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