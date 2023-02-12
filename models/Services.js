import mongoose from 'mongoose';

const ServicesSchema = new mongoose.Schema({
  name:  {type: String },
  type: {type: String },
  category: {type: [Object] },
  isDeleted: {type: Boolean, default: false },
  isActive: {type: Boolean, default: true },
  timestamps : true

}, { toJSON: { virtuals: true }, toObject : { virtuals:true }, versionKey: false });

const Services = mongoose.model('services', ServicesSchema);

export default Services;

