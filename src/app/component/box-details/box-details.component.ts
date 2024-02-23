import { Component } from '@angular/core';

@Component({
  selector: 'app-box-details',
  templateUrl: './box-details.component.html',
  styleUrl: './box-details.component.scss'
})
export class BoxDetailsComponent {
  valeur: number = 0;

  increment() {
    this.valeur++;
  }

  decrement() {
    if (this.valeur > 0) {
      this.valeur--;
    }
  }
}
