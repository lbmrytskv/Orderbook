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
  currentIndex = 0;

  constructor(private dataService: OrderBookDataService) {}

  ngOnInit(): void {
    this.dataService.getSnapshots().subscribe((data) => {
      this.snapshots = data;
      this.currentIndex = 0;
      this.selectedSnapshot = this.snapshots[this.currentIndex];
    });
  }

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const time = target.value;
    const index = this.snapshots.findIndex(s => s.Time === time);
    if (index !== -1) {
      this.currentIndex = index;
      this.selectedSnapshot = this.snapshots[this.currentIndex];
    }
  }

  goToPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedSnapshot = this.snapshots[this.currentIndex];
    }
  }

  goToNext() {
    if (this.currentIndex < this.snapshots.length - 1) {
      this.currentIndex++;
      this.selectedSnapshot = this.snapshots[this.currentIndex];
    }
  }
}
