export interface PaymentModel {}


export interface PaymentRequest {
  amount: number;
  paymentMethod: 'MPESA' | 'BANK';
  phoneNumber?: string;
  bank?: string;
  accountNumber?: string;
}

