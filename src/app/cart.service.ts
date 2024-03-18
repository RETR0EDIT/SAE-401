import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Box } from './box.interface';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userId: string | null = this.localStorageService.getItem('userId');
  private cartSubject = new BehaviorSubject<{ box: Box, quantity: number, total: number }[]>(this.getCart());
  cart$ = this.cartSubject.asObservable();

  private totalItemsSubject = new BehaviorSubject<number>(this.localStorageService.getItem('totalItems') ? Number(this.localStorageService.getItem('totalItems')) : 0);
  totalItems$ = this.totalItemsSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) { }

  setUserId(userId: string | null) {
    this.userId = userId;
  }

  addToCart(box: Box, quantity: number) {
    let cart = this.getCart();
    const totalBoxes = this.getTotalBoxes();
    const total = box.prix * quantity;
    const item = { box, quantity, total };
    cart.push(item);
    
    if (totalBoxes + quantity > 10) {
      throw new Error('Vous ne pouvez pas avoir plus de 10 boîtes dans votre panier.');
    }
    if (this.userId) {
      this.localStorageService.setItem('cart-' + this.userId, JSON.stringify(cart));
    }
    this.cartSubject.next(cart);
    this.updateTotalItems(cart); 
  }

  getCart() {
    let cart = null;
    if (this.userId) {
      cart = this.localStorageService.getItem('cart-' + this.userId);
    }
    return cart ? JSON.parse(cart) : [];
    
  }

  removeFromCart(index: number) {
    let cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      cart[index].quantity -= 1; 
      if (cart[index].quantity === 0) {
        cart.splice(index, 1); 
      }
      if (this.userId) {
        this.localStorageService.setItem('cart-' + this.userId, JSON.stringify(cart));
      }
      this.cartSubject.next(cart);
    }
    this.updateTotalItems(cart);
  }

  getTotalItems(cart: { box: Box, quantity: number, total: number }[]) {
    let total = 0;
    for (let item of cart) {
      total += item.quantity;
    }
    return total;
  }

  getTotalBoxes(): number {
    let total = 0;
    this.cart$.pipe(take(1)).subscribe(cart => {
      for (let item of cart) {
        total += item.quantity;
      }
    });
    return total;
  }

  updateTotalItems(cart: { box: Box, quantity: number, total: number }[]) {
    const totalItems = this.getTotalItems(cart);
    this.totalItemsSubject.next(totalItems); 
  }

  updateQuantity(box: Box, quantity: number) {
    if (quantity <= 0) {
      throw new Error('La quantité doit être supérieure à 0.');
    }

    let cart = this.getCart();
    const item = cart.find((item: { box: Box, quantity: number, total: number }) => item.box.id_boxe === box.id_boxe);
    if (item) {
      item.quantity = quantity;
      item.total = box.prix * quantity;
      if (this.userId) {
        this.localStorageService.setItem('cart-' + this.userId, JSON.stringify(cart));
      }
      this.cartSubject.next(cart);
      this.updateTotalItems(cart);
    }
  }
  
  getBoxCommander(): number[] {
    return this.getCart().map((item: { box: { id_boxe: number }}) => item.box.id_boxe);
  }

  getQuantiteCommander(): number[] {
    return this.getCart().map((item: { quantity: number }) => item.quantity);
  }
}