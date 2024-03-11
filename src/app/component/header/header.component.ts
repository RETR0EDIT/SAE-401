import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service.service'; 
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  totalItems: number = 0;
  role: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private cartService: CartService, private sharedService: SharedService, private localStorageService: LocalStorageService) {
    // Souscrit à totalItems$ dans le constructeur
    this.sharedService.totalItems$.subscribe(totalItems => {
      this.totalItems = totalItems;
      this.localStorageService.setItem('totalItems', this.totalItems.toString()); // Enregistre totalItems dans le localStorage
    });
  }
  
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.getUserRole();
      }
    });
  
    // Récupère totalItems du localStorage
    const savedTotalItems = this.localStorageService.getItem('totalItems');
    if (savedTotalItems) {
      this.totalItems = Number(savedTotalItems);
    }
  }

  // Récupère le rôle de l'utilisateur
  getUserRole(): void {
    let id_client = this.localStorageService.getItem('userId');
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
}