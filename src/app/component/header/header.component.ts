import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service.service';
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';
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
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.getUserRole();
    });

    this.cartService.totalItems$.subscribe((totalItems) => {
      this.totalItems = totalItems;
      this.localStorageService.setItem(
        'totalItems',
        this.totalItems.toString()
      );
    });
  }

  getUserRole(): void {
    const id_client = this.localStorageService.getItem('userId');
    if (id_client) {
      this.authService.getUserRole(id_client).subscribe((role) => {
        this.role = role;
        this.authService.userRole = role;
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onLogoutClick(): void {
    this.authService.logout();
    this.role = '';
    this.router.navigate(['/']);
  }

  navigateToAbout(): void {
    this.router.navigate([''], { fragment: 'about' });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
