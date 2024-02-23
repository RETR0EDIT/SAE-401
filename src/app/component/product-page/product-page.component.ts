import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Box {
  nom: string;
  prix: number;
  image: string;
  composition: string;
}
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  boxes: Box[] = [];
  url = 'http://localhost/SAE-401/api/controller/BoxController.php';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Box[]>(this.url).subscribe(boxes => {
      this.boxes = boxes;
    });
  }
}

