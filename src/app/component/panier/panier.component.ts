import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../cart.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from '../../shared.service';
import { Box, Aliment } from '../../box.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth-service.service';
import { environment } from '../../../environment/environment';

interface ServerResponse {
  message: string;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],
})
export class PanierComponent implements OnInit {
  cart: { box: Box; quantity: number; total: number }[] = [];
  totalItems!: number;
  alimentStrings: string[] = [];
  totalPrix: number = 0;

  constructor(
    private location: Location,
    private http: HttpClient,
    private cartService: CartService,
    private router: Router,
    private sharedService: SharedService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((cart) => {
      setTimeout(() => {
        this.cart = cart;
        this.alimentStrings = this.cart.map((item) =>
          this.formatAliments(item.box.aliments)
        );
        this.totalPrix = this.cart.reduce(
          (sum, item) => sum + item.box.prix * item.quantity,
          0
        );
        this.sharedService.getTotalItems();
      });
    });

    this.sharedService.totalItems$.subscribe((totalItems) => {
      this.totalItems = totalItems;
    });
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  formatAliments(aliments: Aliment[]): string {
    return aliments
      .map((aliment) => `${aliment.nom}: ${aliment.quantite}`)
      .join(', ');
  }

  finaliserCommande() {
    const modal = this.createModal('Finalisation de la commande...');

    setTimeout(() => {
      this.http
        .post<ServerResponse>(`${environment.apiUrl}/acheter/Create.php`, {
          id_client: this.authService.getIdClient(),
          id_boxe: this.cartService.getBoxCommander(),
          quantite: this.cartService.getQuantiteCommander(),
          date: new Date().toISOString(),
        })
        .subscribe(
          (response: ServerResponse) => {
            if (response && response.message === 'Achat créé.') {
              this.updateModal(modal, 'Commande validée', true);
            } else {
              this.updateModal(
                modal,
                'Erreur lors de la validation de la commande',
                false
              );
            }
          },
          (error) => {
            console.error(
              'Erreur lors de la finalisation de la commande :',
              error
            );
            this.updateModal(
              modal,
              'Erreur lors de la validation de la commande',
              false
            );
          }
        );
    }, 2000);
  }

  createModal(message: string): HTMLElement {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${message}</h2>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  updateModal(modal: HTMLElement, message: string, success: boolean) {
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${message}</h2>
        <button id="closeModalBtn">OK</button>
      </div>
    `;
    const closeModalBtn = modal.querySelector('#closeModalBtn');
    closeModalBtn?.addEventListener('click', () => {
      modal.remove();
      if (success) {
        this.cartService.clearCart();
      }
    });
  }

  onAddQuantity(item: { box: Box; quantity: number; total: number }) {
    const totalBoxes = this.cartService.getTotalBoxes() + 1;
    if (totalBoxes <= 10) {
      this.updateQuantity(item, item.quantity + 1);
    } else {
      console.log(
        'Vous ne pouvez pas ajouter plus de 10 boîtes dans votre panier.'
      );
    }
  }

  onLessQuantity(item: { box: Box; quantity: number; total: number }) {
    if (item.quantity > 1) {
      this.updateQuantity(item, item.quantity - 1);
    }
  }

  updateQuantity(
    item: { box: Box; quantity: number; total: number },
    quantity: number
  ) {
    const existingItem = this.cart.find((cartItem) =>
      this.areBoxesEqual(cartItem.box, item.box)
    );
    if (existingItem) {
      existingItem.quantity += quantity - item.quantity;
    } else {
      this.cartService.updateQuantity(item.box, quantity);
    }
  }

  getOptions(quantity: number): number[] {
    const totalBoxes = this.cartService.getTotalBoxes();
    const maxOptions = Math.min(10 - totalBoxes + quantity, 10);
    return Array.from({ length: maxOptions }, (_, i) => i + 1);
  }

  onQuantityChangeWithClone(item: {
    box: Box;
    quantity: number;
    total: number;
  }) {
    const clonedItem = { ...item, quantity: Number(item.quantity) };
    this.onQuantityChange(clonedItem);
  }

  onQuantityChange(item: { box: Box; quantity: number; total: number }) {
    this.updateQuantity(item, Number(item.quantity));
  }

  modifier() {
    // Débloque l'accès aux options de la box
    console.log('Modification de la box');
  }

  private areBoxesEqual(box1: Box, box2: Box): boolean {
    return (
      box1.nom === box2.nom &&
      box1.prix === box2.prix &&
      this.areAlimentsEqual(box1.aliments, box2.aliments)
    );
  }

  private areAlimentsEqual(
    aliments1: Aliment[],
    aliments2: Aliment[]
  ): boolean {
    if (aliments1.length !== aliments2.length) {
      return false;
    }
    for (let i = 0; i < aliments1.length; i++) {
      if (
        aliments1[i].nom !== aliments2[i].nom ||
        aliments1[i].quantite !== aliments2[i].quantite
      ) {
        return false;
      }
    }
    return true;
  }
}
