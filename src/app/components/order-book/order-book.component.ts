import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBookDataService, OrderBookSnapshot } from '../../services/order-book-data.service';

@Component({
  selector: 'app-order-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-book.component.html',
})
export class OrderBookComponent implements OnInit {
  snapshot: OrderBookSnapshot | null = null;

  constructor(private dataService: OrderBookDataService) {}

  ngOnInit(): void {
    this.dataService.getSnapshots().subscribe((data) => {
      this.snapshot = data[0]; // показуємо перший снапшот
    });
  }

  get bids() {
    if (!this.snapshot) return [];
    return Array.from({ length: 10 }, (_, i) => ({
      price: this.snapshot!['Bid' + (i + 1)],
      size: this.snapshot!['Bid' + (i + 1) + 'Size'],
    }));
  }

  get asks() {
    if (!this.snapshot) return [];
    return Array.from({ length: 10 }, (_, i) => ({
      price: this.snapshot!['Ask' + (i + 1)],
      size: this.snapshot!['Ask' + (i + 1) + 'Size'],
    }));
  }
}
