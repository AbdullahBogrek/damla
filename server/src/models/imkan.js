import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ImkanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    requried: true,
    lowercase: true
  },
  kind: {
    type: String,
    enum: ["iş", "gıda", "barınma", "maddi", "sağlık", "eğitim", "diğer"],
    required: true
  },  
  description: {
    type: String,
    required: true
  },
  fromWho: {
    type: String,
    enum: ["şahıs", "vakıf", "kurum"],
    required: true
  },
  phone: {
		type: String,
		required: true,
		match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
	},
  email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
  province: {
		type: String,
		required: true,
		lowercase: true,
	},
	district: {
		type: String,
		required: true,
		lowercase: true,
	},
	street: {
		type: String,
		required: true,
		lowercase: true,
	},
  positions: {},
  photos: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Imkan = mongoose.model('imkan', ImkanSchema);

export default Imkan;
