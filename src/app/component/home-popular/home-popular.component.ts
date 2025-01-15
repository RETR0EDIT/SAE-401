import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Box } from '../../box.interface';
import { environment } from '../../../environment/environment';
@Component({
  selector: 'app-home-popular',
  templateUrl: './home-popular.component.html',
  styleUrls: ['./home-popular.component.scss'],
})
export class HomePopularComponent implements OnInit {
  boxes: Box[] = [];
  url = `${environment.apiUrl}/box/Read.php`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Box[]>(this.url).subscribe(
      (boxes) => {
        this.boxes = boxes
          .map((box) => ({
            ...box,
            saveurs: Array.isArray(box.saveurs)
              ? box.saveurs.join(', ')
              : box.saveurs,
          }))
          .slice(0, 4);
      },
      (error) => {
        console.error('Erreur lors de la récupération des boxes :', error);
      }
    );
  }
}
