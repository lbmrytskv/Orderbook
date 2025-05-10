import { TestBed } from '@angular/core/testing';

import { OrderBookDataService } from './order-book-data.service';

describe('OrderBookDataService', () => {
  let service: OrderBookDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderBookDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
