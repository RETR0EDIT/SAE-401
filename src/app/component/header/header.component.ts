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
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  isDropdownOpen = false;
  totalItems!: number;
  role: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      // Supprimez la vérification isLoggedIn ici
      this.getUserRole();
    });

    // ...

    // Abonnez-vous à totalItems$ ici
    this.cartService.totalItems$.subscribe((totalItems) => {
      console.log('Nouvelle valeur de totalItems :', totalItems); // Ajout d'un log ici
      this.totalItems = totalItems;
      this.localStorageService.setItem(
        'totalItems',
        this.totalItems.toString()
      );
    });
  }

  // Récupère le rôle de l'utilisateur
  getUserRole(): void {
    let id_client = this.localStorageService.getItem('userId');
    if (id_client === null) {
      return;
    }
    this.authService.getUserRole(id_client).subscribe((role) => {
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
    this.router.navigate(['/']).then((success) => {});
  }

  navigateToAbout(): void {
    this.router.navigate([''], { fragment: 'about' });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // toggleDropdown() {
  //   const dropdownMenu = document.getElementById('dropdown-menu');
  //   if (dropdownMenu) {
  //     dropdownMenu.classList.toggle('dropdown-menu1');
  //   }
  // }
}
