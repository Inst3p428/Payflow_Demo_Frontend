import { Routes } from '@angular/router';
import { PaymentForm } from './features/payments/payment-form/payment-form';
import { PaymentStatus } from './features/payments/payment-status/payment-status';

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
    path: '',
    redirectTo: 'payment',
    pathMatch: 'full'
  }
];