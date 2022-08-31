import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TalepSchema = new Schema({
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
  job: {
    type: String,
    enum: ["doktor", "hemşire", "mühendis", "memur", "işçi", "öğrenci"],
    required: true
  },
  income: {
    type: String,
    enum: ["0-500", "500-1000", "1000-2000", "2000-4000", "4000-6000", "6000 ve üzeri"],
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

const Talep = mongoose.model('talep', TalepSchema);

export default Talep;
