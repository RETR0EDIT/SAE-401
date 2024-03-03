import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Box } from './box.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userId: string | null = typeof localStorage !== 'undefined' ? localStorage.getItem('userId') : null;
  private cartSubject = new BehaviorSubject<{ box: Box, quantity: number, total: number }[]>(this.getCart());
  cart$ = this.cartSubject.asObservable();

  private totalItemsSubject = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) { }

  setUserId(userId: string | null) {
    this.userId = userId;
  }

  // Ajoute un article au panier
  addToCart(box: Box, quantity: number) {
    let cart = this.getCart();
    const totalBoxes = this.getTotalBoxes();
    const total = box.prix * quantity;
    const item = { box, quantity, total };
    cart.push(item);
    const userId = typeof localStorage !== 'undefined' ? localStorage.getItem('userId') : null;
    
    if (totalBoxes + quantity > 10) {
      throw new Error('Vous ne pouvez pas avoir plus de 10 boîtes dans votre panier.');
    }
    if (userId) {
      localStorage.setItem('cart-' + userId, JSON.stringify(cart));
    }
    this.cartSubject.next(cart);
    this.updateTotalItems(); 
  }

  // Récupère le panier de l'utilisateur
  getCart() {
    let cart = null;
    const userId = this.localStorageService.getItem('userId');
    if (userId) {
      cart = this.localStorageService.getItem('cart-' + userId);
    }
    return cart ? JSON.parse(cart) : [];
  }

  // Supprime un article du panier
  async removeFromCart(index: number) {
    let cart = await this.getCart();
    if (index >= 0 && index < cart.length) {
      cart[index].quantity -= 1; 
      if (cart[index].quantity === 0) {
        cart.splice(index, 1); 
      }
      const userId = localStorage.getItem('userId');
      if (userId) {
        localStorage.setItem('cart-' + userId, JSON.stringify(cart));
      }
      this.cartSubject.next(cart);
    }
    this.updateTotalItems();
  }

  // Récupère le nombre total d'articles dans le panier
  getTotalItems() {
    let cart = this.getCart();
    let total = 0;
    for (let item of cart) {
      total += item.quantity;
    }
    return total;
  }

  // Récupère le nombre total de boîtes dans le panier
  getTotalBoxes(): number {
    let total = 0;
    this.cart$.subscribe(cart => {
      for (let item of cart) {
        total += item.quantity;
      }
    });
    return total;
  }

  // Met à jour le nombre total d'articles dans le panier
  updateTotalItems() {
    const totalItems = this.getTotalItems();
    this.totalItemsSubject.next(totalItems); 
  }
}