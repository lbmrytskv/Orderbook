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
  isReplaying = false;
  replayTimeouts: any[] = [];

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

  startReplay() {
  if (this.snapshots.length < 2) return;

  this.stopReplay(); 

  const totalDuration = 30000; 
  const interval = totalDuration / (this.snapshots.length - 1);
  this.isReplaying = true;

  for (let i = 1; i < this.snapshots.length; i++) {
    const timeout = setTimeout(() => {
      this.currentIndex = i;
      this.selectedSnapshot = this.snapshots[i];
      if (i === this.snapshots.length - 1) {
        this.isReplaying = false;
      }
    }, i * interval);

    this.replayTimeouts.push(timeout);
  }
}


  pauseReplay() {
    this.replayTimeouts.forEach(t => clearTimeout(t));
    this.replayTimeouts = [];
    this.isReplaying = false;
  }

  stopReplay() {
    this.pauseReplay();
    this.currentIndex = 0;
    this.selectedSnapshot = this.snapshots[0];
  }

  parseTime(timeStr: string): number {
    const [hh, mm, rest] = timeStr.split(':');
    const [ss, ms] = rest.split('.');
    return (
      parseInt(hh) * 3600000 +
      parseInt(mm) * 60000 +
      parseInt(ss) * 1000 +
      parseInt(ms)
    );
  }
}
