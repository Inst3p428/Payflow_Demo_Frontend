import { Routes } from '@angular/router';
import { PaymentForm } from './features/payments/payment-form/payment-form';

export const routes: Routes = [
  {
    path: 'payment',
    component: PaymentForm
  },
  {
    path: '',
    redirectTo: 'payment',
    pathMatch: 'full'
  }
];