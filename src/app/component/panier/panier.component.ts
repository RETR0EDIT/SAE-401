import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from '../../shared.service';
import { Box, Aliment } from '../../box.interface';

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
  totalItems: number = 0; 
  alimentStrings: string[] = [];
  totalPrix: number = 0;

  constructor(private location: Location, private http: HttpClient, private cartService: CartService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.totalItems = this.sharedService.getTotalItems(); 

      // Convertir le tableau d'objets Aliment en une seule chaîne de caractères
      this.alimentStrings = this.cart.map(item => item.box.aliments.map(aliment => `${aliment.nom}: ${aliment.quantite}`).join(', '));
      this.totalPrix = this.cart.reduce((sum, item) => sum + item.box.prix * item.quantity, 0);
    });
  }
  
  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  someFunction() {
    this.totalItems = this.cartService.getTotalItems();
  }
  formatAliments(aliments: Aliment[]): string {
    return aliments.map(aliment => `${aliment.nom}: ${aliment.quantite}`).join(', ');
  }

  modifier(){
    //debloque acces au option de la box voir panier.component.html ligne 40
  }
}