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
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.getUserRole();
      }
    });
    this.totalItems = this.cartService.getTotalItems();
  }

  getUserRole(): void {
    let id_client = localStorage.getItem('userId');
    if (id_client === null) {
      
      
      return;
    }
    this.authService.getUserRole(id_client).subscribe(role => {
      this.role = role;
      this.authService.userRole = role; // Stockez le rôle dans AuthService
    }, error => {
      console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
    });
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
    this.router.navigate(['/']).then(success => {
    });
  }
  

  someFunction() {
    this.totalItems = this.sharedService.getTotalItems();
  }
}
