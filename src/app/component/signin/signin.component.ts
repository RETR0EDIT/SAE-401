import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  form: FormGroup;

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      numero_voie: new FormControl('', Validators.required),
      rue: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required)
    });
  }
  

  onSubmit() {
    if (this.form.valid) {
      this.http.post('http://localhost/sae-401/api/signin.php', JSON.stringify(this.form.value)).subscribe(response => {
      });
    } else {
      alert('Tous les champs du formulaire sont obligatoires.');
      console.log('Form validity:', this.form.valid);
console.log('Form errors:', this.form.errors);
    }
  }
  }  