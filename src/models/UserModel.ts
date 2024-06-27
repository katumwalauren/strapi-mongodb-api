import { Schema, model } from 'mongoose';

const UserModelSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }

});

const UserModel = model('UserModel', UserModelSchema);

export default UserModel;