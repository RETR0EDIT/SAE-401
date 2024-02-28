import { Injectable } from '@angular/core';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private cartService: CartService) { }

  totalItems: number = 0;

  getTotalItems() {
    let cart = this.cartService.getCart();
    let total = 0;
    for (let item of cart) {
      total += item.quantity;
    }
    return total;
  }
}