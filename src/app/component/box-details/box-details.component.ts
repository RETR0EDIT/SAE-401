import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Box {
  nom: string;
  prix: number;
  image: string;
  composition: string;
  saveur: string;
  id_boxe: string;
}

@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.scss']
})
export class BoxDetailsComponent implements OnInit {
  
  box: Box | null = null;
  valeur: number = 1;
  total: number = 0; // Ajoutez cette ligne
  url = 'http://localhost/SAE-401/api/controller/DetailsController.php';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id_boxe = params['id'];
      if (id_boxe) {
        this.http.get<Box>(`${this.url}?id=${id_boxe}`).subscribe(box => {
          this.box = box;
          this.total = this.box.prix; // Initialise le total avec le prix de la box
        });
      }
    });
  }

  increment() {
    this.valeur++;
    this.updateTotal();
  }
  
  decrement() {
    if (this.valeur > 0) {
      this.valeur--;
      this.updateTotal();
    }
  }
  
  updateTotal() {
    if (this.box && this.box.prix) {
      this.total = this.valeur * this.box.prix;
    } else {
      this.total = 0;
    }
  }
}