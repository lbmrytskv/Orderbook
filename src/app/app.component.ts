import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBookDataService, OrderBookSnapshot } from './services/order-book-data.service';
import { OrderBookComponent } from './components/order-book/order-book.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, OrderBookComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  snapshots: OrderBookSnapshot[] = [];
  selectedSnapshot: OrderBookSnapshot | null = null;

  constructor(private dataService: OrderBookDataService) {}

  ngOnInit(): void {
    this.dataService.getSnapshots().subscribe((data) => {
      this.snapshots = data;
      this.selectedSnapshot = data[0]; 
    });
  }

 onSelect(event: Event) {
  const target = event.target as HTMLSelectElement;
  const time = target.value;
  const match = this.snapshots.find(s => s.Time === time);
  if (match) this.selectedSnapshot = match;
}

}
