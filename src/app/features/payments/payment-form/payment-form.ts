import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.css',
})
export class PaymentForm {

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.paymentForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      paymentMethod: [
        'MPESA',
        Validators.required
      ],

      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(07|01)\d{8}$/)
        ]
      ],

      bank: [''],

      accountNumber: ['']
    });

    // Watch for payment method changes
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.updatePaymentFields(method);
    });
  }

  private updatePaymentFields(method: string): void {

    const phoneNumber = this.paymentForm.get('phoneNumber');
    const bank = this.paymentForm.get('bank');
    const accountNumber = this.paymentForm.get('accountNumber');

    if (method === 'MPESA') {

      phoneNumber?.setValidators([
        Validators.required,
        Validators.pattern(/^(07|01)\d{8}$/)
      ]);

      bank?.clearValidators();
      accountNumber?.clearValidators();

    } else if (method === 'BANK') {

      phoneNumber?.clearValidators();

      bank?.setValidators([
        Validators.required
      ]);

      accountNumber?.setValidators([
        Validators.required
      ]);
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

    console.log('Payment request:', this.paymentForm.value);
  }
}
