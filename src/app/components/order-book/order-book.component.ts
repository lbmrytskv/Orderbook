import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBookDataService, OrderBookSnapshot } from '../../services/order-book-data.service';

type Level = {
  price: number;
  askSize?: number;
  bidSize?: number;
};

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
      this.snapshot = data[0];
    });
  }

  get levels(): Level[] {
    if (!this.snapshot) return [];

    const askPrices = [];
    const bidPrices = [];

    for (let i = 1; i <= 10; i++) {
      const askPrice = Number(this.snapshot['Ask' + i]);
      if (!isNaN(askPrice)) askPrices.push(+askPrice.toFixed(4));

      const bidPrice = Number(this.snapshot['Bid' + i]);
      if (!isNaN(bidPrice)) bidPrices.push(+bidPrice.toFixed(4));
    }

    const allPrices = [...askPrices, ...bidPrices];
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);

    const step = 0.0005;
    const levels: Level[] = [];

    for (let p = maxPrice; p >= minPrice; p -= step) {
      const price = +p.toFixed(4);

      const askIndex = askPrices.findIndex(ap => ap === price);
      const bidIndex = bidPrices.findIndex(bp => bp === price);

      const askSize = askIndex >= 0 ? Number(this.snapshot!['Ask' + (askIndex + 1) + 'Size']) : undefined;
      const bidSize = bidIndex >= 0 ? Number(this.snapshot!['Bid' + (bidIndex + 1) + 'Size']) : undefined;

      levels.push({ price, askSize, bidSize });
    }

    return levels;
  }

  get maxSize(): number {
    const allSizes = this.levels.flatMap((l) => [l.askSize || 0, l.bidSize || 0]);
    return Math.max(...allSizes, 1);
  }

  getSizePercent(size?: number): number {
    return size ? (size / this.maxSize) * 100 : 0;
  }

  getPriceFormatted(price: number): string {
    return price.toFixed(4);
  }
}
