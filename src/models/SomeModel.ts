import { Schema, model } from 'mongoose';

const someModelSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }

});

const SomeModel = model('SomeModel', someModelSchema);

export default SomeModel;