import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../auth-service.service'; 
import { Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  

  constructor(private authService: AuthService, private router: Router, private cartService: CartService, private sharedService: SharedService) { }
  totalItems: number =0;
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
  someFunction() {
    this.sharedService.getTotalItems();
  }
}
