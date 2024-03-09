import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SAE401';
  isAdminRoute: boolean = false;

  constructor(private router: Router, private localStorage: LocalStorageService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = this.router.url.includes('/admin');
        this.localStorage.setItem('lastUrl', this.router.url);
      }
    });

    const lastUrl = this.localStorage.getItem('lastUrl');
    if (lastUrl) {
      this.router.navigateByUrl(lastUrl);
    }
  }
}