import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service.service'; 
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private cartService: CartService, private sharedService: SharedService) { }
  totalItems: number =0;
  role: string = '';

  // Initialise le composant et souscrit aux observables nécessaires
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.getUserRole();
      }
    });
    this.cartService.totalItems$.subscribe(totalItems => {
      this.totalItems = totalItems;
    });
  }

  // Récupère le rôle de l'utilisateur
  getUserRole(): void {
    let id_client = localStorage.getItem('userId');
    if (id_client === null) {
      
      
      return;
    }
    this.authService.getUserRole(id_client).subscribe(role => {
      this.role = role;
      this.authService.userRole = role; 
    });
  }

  // Bascule l'état du menu entre ouvert et fermé
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Ferme le menu
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Déconnecte l'utilisateur et le redirige vers la page d'accueil
  onLogoutClick(): void {

    this.authService.logout();
    this.role = '';
    this.router.navigate(['/']).then(success => {
    });
  }
  
  // Met à jour le nombre total d'articles dans le panier
  someFunction() {
    this.totalItems = this.sharedService.getTotalItems();
  }
}
