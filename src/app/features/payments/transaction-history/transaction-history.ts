import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../../../core/services/payment-service';
import { PaymentResponse, PaymentStatus } from '../../../shared/models/payment-model';


type StatusFilter = 'ALL' | PaymentStatus;

@Component({
  selector: 'app-transaction-history',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory implements OnInit{
  private paymentService = inject(PaymentService);

  payments = signal<PaymentResponse[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  filter = signal<StatusFilter>('ALL');

  readonly filters: StatusFilter[] = ['ALL', 'SUCCESS', 'PENDING', 'FAILED'];

  visible = computed(() => {
    const f = this.filter();
    return f === 'ALL' ? this.payments() : this.payments().filter(p => p.status === f);
  });

  totalSuccessful = computed(() =>
    this.payments().filter(p => p.status === 'SUCCESS').reduce((sum, p) => sum + p.amount, 0)
  );

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.paymentService.getHistory().subscribe({
      next: list => {
        this.payments.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load transactions. Is the backend running?');
        this.loading.set(false);
      }
    });
  }

  setFilter(f: StatusFilter): void {
    this.filter.set(f);
  }

}
