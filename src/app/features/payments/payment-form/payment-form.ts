import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PaymentService } from '../../../core/services/payment-service';
import { PaymentRequest } from '../../../shared/models/payment-model';

@Component({
  selector: 'app-payment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
})
export class PaymentForm {
  private router = inject(Router);
  private paymentService = inject(PaymentService);

  paymentForm: FormGroup;
  errorMessage = signal<string | null>(null);
  submitting = signal(false);

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      paymentMethod: ['MPESA', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(07|01)\d{8}$/)]],
      bank: [''],
      accountNumber: ['']
    });

    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.updatePaymentFields(method);
    });
  }

  private updatePaymentFields(method: string): void {
    const phoneNumber = this.paymentForm.get('phoneNumber');
    const bank = this.paymentForm.get('bank');
    const accountNumber = this.paymentForm.get('accountNumber');

    if (method === 'MPESA') {
      phoneNumber?.setValidators([Validators.required, Validators.pattern(/^(07|01)\d{8}$/)]);
      bank?.clearValidators();
      accountNumber?.clearValidators();
    } else if (method === 'BANK') {
      phoneNumber?.clearValidators();
      bank?.setValidators([Validators.required]);
      accountNumber?.setValidators([Validators.required, Validators.pattern(/^\d{6,16}$/)]);
    }

    phoneNumber?.updateValueAndValidity();
    bank?.updateValueAndValidity();
    accountNumber?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const v = this.paymentForm.getRawValue();

    // Only send the fields that belong to the selected method
    const payload: PaymentRequest =
      v.paymentMethod === 'MPESA'
        ? { amount: Number(v.amount), method: 'MPESA', phoneNumber: v.phoneNumber }
        : { amount: Number(v.amount), method: 'BANK', bankName: v.bank, accountNumber: v.accountNumber };

    this.errorMessage.set(null);
    this.submitting.set(true);

    this.paymentService.initiatePayment(payload).subscribe({
      next: p => this.router.navigate(['/payment/status', p.id]),
      error: err => {
        this.submitting.set(false);
        this.errorMessage.set(err.error?.message ?? 'Payment failed to start');
      }
    });
  }
}