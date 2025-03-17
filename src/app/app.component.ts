import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cryptos: any[] = []; // Stores crypto data
  isLoading = true;
  errorMessage = ''; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // API call to fetch crypto prices
    this.http
      .get<any[]>('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .subscribe({
        next: (data) => {
          this.cryptos = data; 
          this.isLoading = false; 
        },
        error: (error) => {
          this.errorMessage = 'Failed to load data!';
          console.error(error);
          this.isLoading = false;
        },
      });
  }
}
