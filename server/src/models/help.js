import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const HelpSchema = new Schema({
  user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
  help: {
    type: String,
    required: true,
    enum: ["request", "opportunity"]
  },
  title: {
    type: String,
    required: true,
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
  description: {
    type: String,
    required: true,
  },
  phone: {
		type: String,
		unique: true,
		validate: {
			validator: function(v) {
			  return /\d{3}-\d{3}-\d{4}/.test(v);
			},
			message: props => `${props.value} geçerli bir telefon numarası değildir!`
		  },
		required: [true, 'Telefon numarası girmeniz gerekmektedir.']
	},
  photos: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('help', HelpSchema);

export default User;
