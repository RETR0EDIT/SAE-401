import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service.service'; 
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  totalItems: number = 0;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.totalItems = this.cartService.getTotalItems();
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onLogoutClick(): void {

    this.authService.logout();

    this.router.navigate(['/']).then(success => {
      if (success) {
      } else {
      }
    });
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
      header?.classList.add('scroll-header');
    } else {
      header?.classList.remove('scroll-header');
    }
  }
  getTotalItems() {
    let cart = this.cartService.getCart();
    let total = 0;
    for (let item of cart) {
      total += item.quantity;
    }
    return total;
  }
}
