import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Box {
  nom: string;
  prix: number;
  image: string;
  saveur: string;
}

@Component({
  selector: 'app-home-popular',
  templateUrl: './home-popular.component.html',
  styleUrls: ['./home-popular.component.scss']
})
export class HomePopularComponent implements OnInit {
  boxes: Box[] = [];
  url = 'http://localhost/SAE-401/api/controller/BoxController.php';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Box[]>(this.url).subscribe(boxes => {
      this.boxes = boxes.slice(0, 4);
    });
  }
}