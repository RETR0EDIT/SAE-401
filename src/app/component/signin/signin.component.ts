import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

interface ApiResponse {
  user: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    verif_password: string;
    numero_voie: string;
    rue: string;
    ville: string;
  };
  response: string;
}

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const verif_password = control.get('verif_password');

  if (password && verif_password && password.value !== verif_password.value) {
    return { passwordsNotMatching: true };
  }
  return null;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  form: FormGroup;

  constructor(private http: HttpClient) {
    this.form = new FormGroup(
      {
        nom: new FormControl('', Validators.required),
        prenom: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        verif_password: new FormControl('', Validators.required),
        numero_voie: new FormControl('', Validators.required),
        rue: new FormControl('', Validators.required),
        ville: new FormControl('', Validators.required),
      },
      { validators: passwordMatchValidator }
    );
  }

  get nom() {
    return this.form.get('nom');
  }
  get prenom() {
    return this.form.get('prenom');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get verif_password() {
    return this.form.get('verif_password');
  }
  get numero_voie() {
    return this.form.get('numero_voie');
  }
  get rue() {
    return this.form.get('rue');
  }
  get ville() {
    return this.form.get('ville');
  }

  onSubmit() {
    if (this.form.valid) {
      this.http
        .post<ApiResponse>(
          `${environment.apiUrl}/signin.php`,
          this.form.value,
          { observe: 'response' }
        )
        .subscribe(
          (response) => {
            if (response.status === 200 && response.ok) {
              window.location.href = 'http://localhost:4200';
            } else {
              console.error(
                "Une erreur est survenue lors de l'inscription.",
                response
              );
            }
          },
          (error) => {
            console.error(
              "Une erreur est survenue lors de l'inscription.",
              error
            );
          }
        );
    }
  }
}
