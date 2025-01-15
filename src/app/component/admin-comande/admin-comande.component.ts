import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-admin-comande',
  templateUrl: './admin-comande.component.html',
  styleUrls: ['./admin-comande.component.scss'],
})
export class AdminComandeComponent implements OnInit {
  commands: any[] = [];
  nombre_commande: number = 0;
  groupedCommands: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.getAllCommands();
  }

  getAllCommands() {
    this.http.get(`${environment.apiUrl}/acheter/Read.php`).subscribe(
      (response: any) => {
        this.commands = response as any[];
        this.nombre_commande = this.commands.length;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  countCommandDivs(): number {
    const elements = this.el.nativeElement.querySelectorAll('.nombre_comande');
    return elements.length;
  }

  valider(id_acheter: number) {
    const url = `${environment.apiUrl}/acheter/update.php`;
    const body = { id_acheter: id_acheter, valider: 'valider' };
    this.putRequest(url, body).subscribe(
      (response) => {
        console.log(response);
        this.getAllCommands();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private putRequest(url: string, body: any) {
    return this.http.put(url, body);
  }
}
