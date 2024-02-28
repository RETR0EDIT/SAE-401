import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService, Box } from '../../cart.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from '../../shared.service';

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
  totalItems: number =0; 

  constructor(private location: Location, private http: HttpClient, private cartService: CartService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.totalItems = this.sharedService.getTotalItems(); 
    });
  }
  
  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  someFunction() {
    this.sharedService.getTotalItems();
  }
}