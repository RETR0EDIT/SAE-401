import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private cartService: CartService, private localStorageService: LocalStorageService) { }

  private totalItemsSource = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSource.asObservable();

  getTotalItems() {
    let cart = this.cartService.getCart();
    let total = 0;
    for (let item of cart) {
      total += item.quantity;
    }
    this.totalItemsSource.next(total); 
    this.localStorageService.setItem('totalItems', total.toString()); 
  }
}