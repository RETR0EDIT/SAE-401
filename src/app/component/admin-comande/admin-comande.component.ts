import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-comande',
  templateUrl: './admin-comande.component.html',
  styleUrls: ['./admin-comande.component.scss']
})
export class AdminComandeComponent implements OnInit {
  commands: any[] = [];
  nombre_commande: number = 0;
  groupedCommands: any[] = [];
  constructor(private router: Router, private http: HttpClient, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.getAllCommands();

  }

getAllCommands() {
  this.http.get('http://localhost/SAE-401/api/acheter/Read.php').subscribe(
    (response: any) => {
      this.commands = response as any[];
      this.nombre_commande = this.commands.length;
      const groupedCommandsObject = this.groupCommandsByClientAndDate(this.commands);
      this.groupedCommands = Object.values(groupedCommandsObject);
      console.log(this.groupedCommands);
    },
    error => {
      console.error('There was an error!', error);
    }
  );
}

  countCommandDivs(): number {
    const elements = this.el.nativeElement.querySelectorAll('.nombre_comande');
    return elements.length;
  }
  groupCommandsByClientAndDate(commands: any[]): any[] {
    return commands.map((command, index) => {
      return { ...command, count: 1, key: `${command.id_client}-${command.date}-${index}` };
    });
  }
  
}