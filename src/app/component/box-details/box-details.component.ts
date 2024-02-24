import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Box {
  nom: string;
  prix: number;
  image: string;
  composition: string;
  id_boxe: number;
}

@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.scss']
})
export class BoxDetailsComponent implements OnInit {
  box: Box | null = null;
  valeur: number = 1;
  url = 'http://localhost/SAE-401/api/controller/BoxController.php';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<Box>(`${this.url}?id=${id}`).subscribe(box => {
        this.box = box;
        console.log('Détails de la boîte récupérés de l\'API :', box);
      }, error => {
        console.error('Erreur lors de la récupération des détails de la boîte de l\'API :', error);
      });
    }
  }

  decrement() {
    if (this.valeur > 1) {
      this.valeur--;
    }
  }

  increment() {
    this.valeur++;
  }
}