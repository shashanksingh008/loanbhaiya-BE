import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name:  {type: String },
  email: {type: String },
  number: {type: String, required : true },
  source: {type: String },
  isDeleted: {type: Boolean, default: false },
  isActive: {type: Boolean, default: true },
  source: {type: String },
  timestamps : true

}, { toJSON: { virtuals: true }, toObject : { virtuals:true }, versionKey: false });

const Users = mongoose.model('users', UserSchema);

export default Users;

