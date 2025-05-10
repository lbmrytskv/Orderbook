import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface OrderBookSnapshot {
  Time: string;
  [key: string]: string | number;
}


@Injectable({
  providedIn: 'root'
})
export class OrderBookDataService {
  constructor(private http: HttpClient) {}

  getSnapshots(): Observable<OrderBookSnapshot[]> {
    return this.http.get<OrderBookSnapshot[]>('data/tradingdata.json');
  }
}
