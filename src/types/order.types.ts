import { Types } from 'mongoose';

export interface IOrderItem {
  productId: Types.ObjectId | string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface IOrder {
  _id?: Types.ObjectId | string;
  userId: Types.ObjectId | string | null;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: IOrderItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  createdAt: Date;
}
