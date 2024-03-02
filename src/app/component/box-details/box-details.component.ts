import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { Box } from '../../box.interface';


@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.scss']
})
export class BoxDetailsComponent implements OnInit {
  
  box: Box | null = null;
  valeur: number = 1;
  total: number = 0;
  totalString: string = '0.00';
  url = 'http://localhost/SAE-401/api/details/Read_one.php';

  constructor(private route: ActivatedRoute, private http: HttpClient, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id_boxe = params['id'];
      if (id_boxe) {
        this.http.get<Box[]>(`${this.url}?id=${id_boxe}`).subscribe(boxes => {
          if (boxes.length > 0) {
            this.box = boxes[0];
            this.updateTotal();
          }
        });
      }
    });
  }

  increment() {
    this.valeur++;
    this.updateTotal();
  }
  
  decrement() {
    if (this.valeur > 1) {
      this.valeur--;
      this.updateTotal();
    }
  }
  
  updateTotal() {
    if (this.box && this.box.prix) {
      this.total = this.valeur * this.box.prix;
      this.totalString = this.total.toFixed(2);
    } else {
      this.total = 0;
      this.totalString = '0.00';
    }
  }

 

  addToCart() {
    if (this.box) {
      this.cartService.addToCart(this.box, this.valeur);
    }
  }

  getComposition(): string {
    if (this.box && this.box.aliments) {
      return this.box.aliments.map(aliment => `${aliment.nom} x${aliment.quantite}`).join('<br>');
    }
    return '';
  }
}