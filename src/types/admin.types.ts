import { Types } from 'mongoose';

export interface IAdmin {
  _id?: Types.ObjectId | string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin' | 'super_admin';
  createdAt: Date;
}
