import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Box } from './box.interface';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<
    { box: Box; quantity: number; total: number }[]
  >(this.getCart());
  cart$ = this.cartSubject.asObservable();

  private totalItemsSubject = new BehaviorSubject<number>(
    this.localStorageService.getItem('totalItems')
      ? Number(this.localStorageService.getItem('totalItems'))
      : 0
  );
  totalItems$ = this.totalItemsSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {}

  addToCart(box: Box, quantity: number) {
    let cart = this.getCart();
    const totalBoxes = this.getTotalBoxes();
    const total = box.prix * quantity;
    const item = { box, quantity, total };
    cart.push(item);

    if (totalBoxes + quantity > 10) {
      throw new Error(
        'Vous ne pouvez pas avoir plus de 10 boîtes dans votre panier.'
      );
    }

    // Utilisez toujours 'cart-anonymous' comme clé de stockage local
    const storageKey = 'cart-anonymous';

    this.localStorageService.setItem(storageKey, JSON.stringify(cart));
    this.cartSubject.next(cart);

    // Mettre à jour totalItems
    const totalItems = this.totalItemsSubject.getValue() + quantity;
    this.totalItemsSubject.next(totalItems);
    this.localStorageService.setItem('totalItems', totalItems.toString());
    this.updateTotalItems(this.getCart());
  }

  getCart() {
    // Utilisez toujours 'cart-anonymous' comme clé de stockage local
    const storageKey = 'cart-anonymous';

    const cart = this.localStorageService.getItem(storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  removeFromCart(index: number) {
    let cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      cart[index].quantity -= 1;
      if (cart[index].quantity === 0) {
        cart.splice(index, 1);
      }
      this.localStorageService.setItem('cart-anonymous', JSON.stringify(cart));
      this.cartSubject.next(cart);
    }
    this.updateTotalItems(cart);
  }

  clearCart() {
    // Utilisez toujours 'cart-anonymous' comme clé de stockage local
    const storageKey = 'cart-anonymous';

    this.cartSubject.next([]); // Réinitialise le sujet avec un tableau vide
    this.totalItemsSubject.next(0); // Réinitialise le nombre total d'articles
    this.localStorageService.removeItem(storageKey); // Supprime le panier du stockage local
    this.localStorageService.removeItem('totalItems'); // Supprime le nombre total d'articles du stockage local
  }

  getTotalItems(cart: { box: Box; quantity: number; total: number }[]) {
    let total = 0;
    for (let item of cart) {
      total += item.quantity;
    }
    return total;
  }

  getTotalBoxes(): number {
    let total = 0;
    this.cart$.pipe(take(1)).subscribe((cart) => {
      for (let item of cart) {
        total += item.quantity;
      }
    });
    return total;
  }

  updateTotalItems(cart: { box: Box; quantity: number; total: number }[]) {
    const totalItems = this.getTotalItems(cart);
    this.totalItemsSubject.next(totalItems);
    this.localStorageService.setItem('totalItems', totalItems.toString());
  }

  updateQuantity(box: Box, quantity: number) {
    if (quantity <= 0) {
      throw new Error('La quantité doit être supérieure à 0.');
    }

    let cart = this.getCart();
    const item = cart.find(
      (item: { box: Box; quantity: number; total: number }) =>
        item.box.id_boxe === box.id_boxe
    );
    if (item) {
      item.quantity = quantity;
      item.total = box.prix * quantity;
      this.localStorageService.setItem('cart-anonymous', JSON.stringify(cart));
      this.cartSubject.next(cart);
      this.updateTotalItems(cart);
    }
  }

  getBoxCommander(): number[] {
    return this.getCart().map(
      (item: { box: { id_boxe: number } }) => item.box.id_boxe
    );
  }

  getQuantiteCommander(): number[] {
    return this.getCart().map((item: { quantity: number }) => item.quantity);
  }
}
