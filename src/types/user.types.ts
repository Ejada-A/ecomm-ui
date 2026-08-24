import { Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId | string;
  email: string;
  passwordHash: string;
  name: string;
  address?: string | null;
  isActive: boolean;
  createdAt: Date;
}
