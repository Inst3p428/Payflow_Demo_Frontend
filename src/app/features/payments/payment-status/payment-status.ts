import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { PaymentResponse } from '../../../shared/models/payment-model';
import { PaymentService } from '../../../core/services/payment-service';
import { Router } from 'react-router-dom';

@Component({
  selector: 'app-payment-status',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './payment-status.html',
  styleUrl: './payment-status.css',
})
export class PaymentStatus implements OnInit{
  private route = inject(ActivatedRoute);
  private paymentService = inject(PaymentService);
  private destroyRef = inject(DestroyRef);

  payment = signal<PaymentResponse | null>(null);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.paymentService.pollUntilSettled(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: p => this.payment.set(p),
        error: () => this.error.set('Could not load payment status')
      });
  }

}
