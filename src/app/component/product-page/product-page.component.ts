import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Box } from '../../box.interface';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  boxes: Box[] = [];
  url = `${environment.apiUrl}/controller/BoxController.php`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Box[]>(this.url).subscribe(
      (boxes) => {
        this.boxes = boxes.map((box) => ({
          ...box,
          saveurs: Array.isArray(box.saveurs)
            ? box.saveurs.join(', ')
            : box.saveurs,
        }));
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération des boîtes de l'API :",
          error
        );
      }
    );
  }
}
