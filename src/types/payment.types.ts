import { Types } from 'mongoose';

export interface IPayment {
  _id?: Types.ObjectId | string;
  orderId: Types.ObjectId | string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  stripePaymentIntentId: string;
  createdAt: Date;
}
