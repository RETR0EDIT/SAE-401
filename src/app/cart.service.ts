import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Box } from './box.interface';

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

    if (totalBoxes + quantity > 10) {
      throw new Error(
        'Vous ne pouvez pas avoir plus de 10 boîtes dans votre panier.'
      );
    }

    const existingItem = cart.find(
      (item: { box: Box; quantity: number; total: number }) =>
        item.box.id_boxe === box.id_boxe
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.total = existingItem.box.prix * existingItem.quantity;
    } else {
      cart.push({ box, quantity, total });
    }

    this.updateCart(cart);
  }

  getCart() {
    const cart = this.localStorageService.getItem('cart-anonymous');
    return cart ? JSON.parse(cart) : [];
  }

  removeFromCart(index: number) {
    let cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      cart[index].quantity -= 1;
      if (cart[index].quantity === 0) {
        cart.splice(index, 1);
      }
      this.updateCart(cart);
    }
  }

  clearCart() {
    this.cartSubject.next([]);
    this.totalItemsSubject.next(0);
    this.localStorageService.removeItem('cart-anonymous');
    this.localStorageService.removeItem('totalItems');
  }

  getTotalItems(cart: { box: Box; quantity: number; total: number }[]) {
    return cart.reduce((total, item) => (total += item.quantity), 0);
  }

  getTotalBoxes(): number {
    return this.getTotalItems(this.getCart());
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
      this.updateCart(cart);
    }
  }

  getBoxCommander(): number[] {
    return this.getCart().map(
      (item: { box: Box; quantity: number; total: number }) => item.box.id_boxe
    );
  }

  getQuantiteCommander(): number[] {
    return this.getCart().map(
      (item: { box: Box; quantity: number; total: number }) => item.quantity
    );
  }

  private updateCart(cart: { box: Box; quantity: number; total: number }[]) {
    this.localStorageService.setItem('cart-anonymous', JSON.stringify(cart));
    this.cartSubject.next(cart);
    this.updateTotalItems(cart);
  }
}
