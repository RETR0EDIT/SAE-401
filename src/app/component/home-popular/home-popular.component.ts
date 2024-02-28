import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Box {
  nom: string;
  prix: number;
  image: string;
  saveurs: string;
  id_boxe: string;
}

@Component({
  selector: 'app-home-popular',
  templateUrl: './home-popular.component.html',
  styleUrls: ['./home-popular.component.scss']
})
export class HomePopularComponent implements OnInit {
  boxes: Box[] = [];
  url = 'http://localhost/SAE-401/api/box/read.php';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Box[]>(this.url).subscribe(boxes => {
      this.boxes = boxes.map(box => ({
        ...box,
        saveurs: box.saveurs.replace(/,/g, ', ')
      })).slice(0, 4);
    });
  }
}