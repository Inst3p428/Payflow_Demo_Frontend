import { Routes } from '@angular/router';
import { PaymentForm } from './features/payments/payment-form/payment-form';
import { PaymentStatus } from './features/payments/payment-status/payment-status';
import { TransactionHistory } from './features/payments/transaction-history/transaction-history';

export const routes: Routes = [
  {
    path: 'payment',
    component: PaymentForm
  },
  {
    path: 'payment/status/:id',
    component: PaymentStatus
  },
  {
    path: 'history', 
    component: TransactionHistory
  },
  {
    path: '',
    redirectTo: 'payment',
    pathMatch: 'full'
  }
];