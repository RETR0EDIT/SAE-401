import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Box {
  nom: string;
  prix: number;
  image: string;
  composition: string;
  id_boxe: number;
}

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  boxes: Box[] = [];
  url = 'http://localhost/SAE-401/api/controller/BoxController.php';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get<Box[]>(this.url).subscribe(boxes => {
      this.boxes = boxes;
      console.log('Boîtes récupérées de l\'API :', boxes);
    }, error => {
      console.error('Erreur lors de la récupération des boîtes de l\'API :', error);
    });
  }


}