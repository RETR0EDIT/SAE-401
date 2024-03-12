import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from '../../shared.service';
import { Box, Aliment } from '../../box.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth-service.service';
interface LoginResponse {
  message: string;
}
interface ServerResponse {
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

  constructor(private location: Location, private http: HttpClient, private cartService: CartService, private router: Router, private sharedService: SharedService, private snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      setTimeout(() => {
        this.cart = cart;
        // Convertir le tableau d'objets Aliment en une seule chaîne de caractères
        this.alimentStrings = this.cart.map(item => item.box.aliments.map(aliment => `${aliment.nom}: ${aliment.quantite}`).join(', '));
        this.totalPrix = this.cart.reduce((sum, item) => sum + item.box.prix * item.quantity, 0);
        this.sharedService.getTotalItems();

      });
    });
  
    this.sharedService.totalItems$.subscribe(totalItems => {
      this.totalItems = totalItems;
    });
  }
  
  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  someFunction() {
    this.totalItems = this.cartService.getTotalItems(this.cart);
  }
  formatAliments(aliments: Aliment[]): string {
    return aliments.map(aliment => `${aliment.nom}: ${aliment.quantite}`).join(', ');
  }

  modifier(){
    //debloque acces au option de la box voir panier.component.html ligne 40
  }


  finaliserCommande() {
    this.snackBar.open('Finalisation de la commande...', '', {
      duration: 4000,  
    });
  
    setTimeout(() => {
      this.http.post<ServerResponse>('http://localhost/sae-401/api/acheter/Create.php', {
        id_client: this.authService.getIdClient(), 
        id_boxe: this.cartService.getBoxCommander(),
        quantite: this.cartService.getQuantiteCommander(),
        date: new Date().toISOString(),
      }).subscribe((response: ServerResponse) => {
        
        if (response && response.message === 'Achat créé.') {
          this.snackBar.open('Commande validée', '', {
            duration: 4000,
          });
        } else {
          this.snackBar.open('Erreur lors de la validation de la commande', '', {
            duration: 4000,
          });
        }
      });
    }, 4000);
  }
  getOptions(quantity: number): number[] {
    const totalBoxes = this.cartService.getTotalBoxes();
    const maxOptions = Math.min(10 - totalBoxes + quantity, 10);
    return Array.from({length: maxOptions}, (_, i) => i + 1);
  }
  onQuantityChange(item: { box: Box, quantity: number, total: number }) {
    this.cartService.updateQuantity(item.box, Number(item.quantity));
  }
    
  onQuantityChangeWithClone(item: { box: Box, quantity: number, total: number }) {
    const clonedItem = { ...item, quantity: Number(item.quantity) };
    this.onQuantityChange(clonedItem);
  }
}