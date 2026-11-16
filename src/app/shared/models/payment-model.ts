export type PaymentMethod = 'MPESA' | 'BANK';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface PaymentModel {}


export interface PaymentRequest {
  amount: number;
  method: PaymentMethod;
  phoneNumber?: string;
  bankName?: string;
  accountNumber?: string;
}

export interface PaymentResponse {
  id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  reference: string | null;
  failureReason: string | null;
  createdAt: string;
  updatedAt: string;
}
