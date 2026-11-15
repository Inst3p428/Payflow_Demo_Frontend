import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentRequest } from '../../shared/models/payment-model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private readonly apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  initiatePayment(paymentData: PaymentRequest): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/initiate`,
      paymentData
    );
  }
}
