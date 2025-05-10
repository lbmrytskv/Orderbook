import { Component } from '@angular/core';
import { OrderBookComponent } from './components/order-book/order-book.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrderBookComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'order-book';
}
