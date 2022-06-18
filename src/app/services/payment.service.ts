import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  db: any;
  constructor(private http: HttpClient) {}

  createOrder(data) {
    return this.http.post('https://lincit-payment-server.herokuapp.com/order',data);
  }
}
