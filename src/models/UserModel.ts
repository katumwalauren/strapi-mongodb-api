import { Schema, model } from 'mongoose';
import { User, decode } from './User';
import NotFoundException from '../exceptions/NotFoundException';

const UserModelSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }

});

const UserModel = model('UserModel', UserModelSchema);

export async function findUser(userId: string): Promise<User>{
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new NotFoundException(`User with Id ${userId} was not found`);
  }

  return decode(user.toObject());
}
