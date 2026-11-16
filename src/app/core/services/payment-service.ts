import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';
import { PaymentRequest, PaymentResponse } from '../../shared/models/payment-model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/payments';

  

  initiatePayment(request: PaymentRequest): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(this.baseUrl, request);
  }

  getPayment(id: string): Observable<PaymentResponse> {
    return this.http.get<PaymentResponse>(`${this.baseUrl}/${id}`);
  }
  
  getHistory(): Observable<PaymentResponse[]> {
    return this.http.get<PaymentResponse[]>(this.baseUrl);
  }

  /** Polls every 2s and completes once the status leaves PENDING (emits the final value). */
  pollUntilSettled(id: string): Observable<PaymentResponse> {
    return timer(0, 2000).pipe(
      switchMap(() => this.getPayment(id)),
      takeWhile(p => p.status === 'PENDING', true)
    );
  }

}
