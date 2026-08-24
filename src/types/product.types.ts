import { Types } from 'mongoose';

export interface ICategory {
  _id?: Types.ObjectId | string;
  name: string;
  createdAt: Date;
}

export interface IProduct {
  _id?: Types.ObjectId | string;
  categoryId: Types.ObjectId | string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: Date;
}
