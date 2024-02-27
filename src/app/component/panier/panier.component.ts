import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService, Box } from '../../cart.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface LoginResponse {
  message: string;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  cart: { box: Box, quantity: number, total: number }[] = [];

  constructor(private location: Location, private http: HttpClient, private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
    this.loadData();
  }
  
  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }
  
  loadData() {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');
    this.cartService.setUserId(userId);
    
  }
}