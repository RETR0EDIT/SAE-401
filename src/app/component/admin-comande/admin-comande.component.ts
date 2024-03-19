import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-comande',
  templateUrl: './admin-comande.component.html',
  styleUrls: ['./admin-comande.component.scss']
})
export class AdminComandeComponent implements OnInit {
  commands: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getAllCommands();
  }

  getAllCommands() {
    this.http.get('http://localhost/SAE-401/api/acheter/Read.php').subscribe(
      (response: any) => {
        this.commands = response as any[];
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
}